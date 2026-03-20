import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { runCalculationPipeline } from '@/lib/calculations'
import type { CalculationInput, AssetPortfolio, IncomeRecord, ExpenseRecord, TaxDebt, TollingEvent, HouseholdInfo, PreQualifierAnswers } from '@/lib/calculations/types'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase not configured')
  return createClient(url, key)
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { caseId } = await request.json()

    if (!caseId) {
      return NextResponse.json({ error: 'caseId is required' }, { status: 400 })
    }

    // Fetch case record
    const { data: caseRecord, error: caseError } = await supabaseAdmin
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .single()

    if (caseError || !caseRecord) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    // Fetch all related data in parallel
    const [
      { data: assets },
      { data: income },
      { data: expenses },
      { data: taxDebts },
      { data: tollingEvents },
      { data: household },
      { data: preQualifier },
    ] = await Promise.all([
      supabaseAdmin.from('assets').select('*').eq('case_id', caseId),
      supabaseAdmin.from('income').select('*').eq('case_id', caseId),
      supabaseAdmin.from('expenses').select('*').eq('case_id', caseId),
      supabaseAdmin.from('tax_debts').select('*').eq('case_id', caseId),
      supabaseAdmin.from('tolling_events').select('*').eq('case_id', caseId),
      supabaseAdmin.from('household_info').select('*').eq('case_id', caseId).single(),
      supabaseAdmin.from('pre_qualifier').select('*').eq('case_id', caseId).single(),
    ])

    // Build asset portfolio from flat asset records
    const assetPortfolio: AssetPortfolio = {
      bankAccounts: (assets ?? []).filter((a) => a.asset_type === 'bank_account').map((a) => ({
        id: a.id, balance: a.balance ?? 0, isJoint: a.is_joint ?? false,
      })),
      investments: (assets ?? []).filter((a) => a.asset_type === 'investment').map((a) => ({
        id: a.id, currentValue: a.current_value ?? 0, loanBalance: a.loan_balance ?? 0, isLiquid: a.is_liquid ?? true,
      })),
      retirementAccounts: (assets ?? []).filter((a) => a.asset_type === 'retirement').map((a) => ({
        id: a.id, currentValue: a.current_value ?? 0, loanBalance: a.loan_balance ?? 0,
        ownerAge: a.owner_age ?? 40, earlyWithdrawalPenaltyPct: a.early_withdrawal_penalty_pct ?? 10,
        estimatedTaxRatePct: a.estimated_tax_rate_pct ?? 22,
      })),
      realEstate: (assets ?? []).filter((a) => a.asset_type === 'real_estate').map((a) => ({
        id: a.id, fmv: a.fmv ?? 0, mortgageBalance: a.mortgage_balance ?? 0,
        helocBalance: a.heloc_balance ?? 0, isJoint: a.is_joint ?? false,
      })),
      vehicles: (assets ?? []).filter((a) => a.asset_type === 'vehicle').map((a) => ({
        id: a.id, fmv: a.fmv ?? 0, loanBalance: a.loan_balance ?? 0,
      })),
      lifeInsurance: (assets ?? []).filter((a) => a.asset_type === 'life_insurance').map((a) => ({
        id: a.id, policyType: a.policy_type ?? 'Term', cashSurrenderValue: a.cash_surrender_value ?? 0,
        policyLoans: a.policy_loans ?? 0,
      })),
      cryptoAssets: (assets ?? []).filter((a) => a.asset_type === 'crypto').map((a) => ({
        id: a.id, estimatedValue: a.estimated_value ?? 0,
      })),
      otherAssets: (assets ?? []).filter((a) => a.asset_type === 'other').map((a) => ({
        id: a.id, estimatedValue: a.estimated_value ?? 0, loanBalance: a.loan_balance ?? 0,
      })),
    }

    // Map income records
    const incomeRecords: IncomeRecord[] = (income ?? []).map((i) => ({
      person: i.person ?? 'taxpayer',
      incomeType: i.income_type ?? 'wages',
      grossMonthly: i.gross_monthly ?? 0,
      federalWithholding: i.federal_withholding,
      stateWithholding: i.state_withholding,
      ficaWithholding: i.fica_withholding,
    }))

    // Map expense records
    const expenseRecords: ExpenseRecord[] = (expenses ?? []).map((ex) => ({
      category: ex.category,
      actualAmount: ex.actual_amount ?? 0,
      irsAllowableAmount: ex.irs_allowable_amount,
    }))

    // Map tax debts
    const taxDebtRecords: TaxDebt[] = (taxDebts ?? []).map((d) => ({
      id: d.id,
      taxYear: d.tax_year,
      taxForm: d.tax_form ?? '1040',
      balance: d.balance ?? 0,
      taxPrincipal: d.tax_principal ?? 0,
      penaltyAmount: d.penalty_amount ?? 0,
      interestAmount: d.interest_amount ?? 0,
      assessmentDate: d.assessment_date,
      isSfr: d.is_sfr ?? false,
      trustFundPortion: d.trust_fund_portion,
      nonTrustFundPortion: d.non_trust_fund_portion,
      csedDate: d.csed_date,
    }))

    // Map tolling events grouped by debt ID
    const tollingEventMap: Record<string, TollingEvent[]> = {}
    for (const te of tollingEvents ?? []) {
      const debtId = te.tax_debt_id
      if (!tollingEventMap[debtId]) tollingEventMap[debtId] = []
      tollingEventMap[debtId].push({
        eventType: te.event_type,
        startDate: te.start_date,
        endDate: te.end_date,
      })
    }

    // Map household info
    const householdInfo: HouseholdInfo = {
      familySize: household?.family_size ?? 1,
      membersUnder17: household?.members_under_17 ?? 0,
      members65Plus: household?.members_65_plus ?? 0,
      state: household?.state ?? '',
      county: household?.county ?? '',
      censusRegion: household?.census_region ?? 'south',
      numVehicles: household?.num_vehicles ?? 0,
      housingType: household?.housing_type ?? 'Rent',
      grossMonthlyIncomeBracket: household?.gross_monthly_income_bracket ?? '',
    }

    // Map pre-qualifier answers
    const preQualifierAnswers: PreQualifierAnswers = {
      allReturnsFiled: preQualifier?.all_returns_filed ?? false,
      inBankruptcy: preQualifier?.in_bankruptcy ?? false,
      estimatedPaymentsCurrent: preQualifier?.estimated_payments_current ?? false,
      auditOpen: preQualifier?.audit_open ?? false,
      hasActiveIA: preQualifier?.has_active_ia ?? false,
      oicPending: preQualifier?.oic_pending ?? false,
      hasPriorPenalties: preQualifier?.has_prior_penalties ?? false,
      cncStatus: preQualifier?.cnc_status ?? false,
      hasNFTL: preQualifier?.has_nftl ?? false,
      levyNotice: preQualifier?.levy_notice ?? false,
      activeGarnishment: preQualifier?.active_garnishment ?? false,
      bankLevy: preQualifier?.bank_levy ?? false,
      usCitizen: preQualifier?.us_citizen ?? true,
      livingAbroad: preQualifier?.living_abroad ?? false,
      assetTransfers: preQualifier?.asset_transfers ?? false,
      stateReturns: preQualifier?.state_returns ?? false,
    }

    // Assemble calculation input
    const calculationInput: CalculationInput = {
      assets: assetPortfolio,
      income: incomeRecords,
      expenses: expenseRecords,
      taxDebts: taxDebtRecords,
      tollingEvents: tollingEventMap,
      household: householdInfo,
      preQualifier: preQualifierAnswers,
      filingStatus: caseRecord.filing_status ?? 'Single',
      taxpayerType: caseRecord.taxpayer_type ?? 'Individual',
    }

    // Fetch local housing standard from DB if available
    let localHousingStandard: number | null = null
    if (householdInfo.state && householdInfo.county) {
      const { data: localStd } = await supabaseAdmin
        .from('irs_local_standards')
        .select('allowance')
        .eq('state', householdInfo.state)
        .eq('county', householdInfo.county)
        .eq('family_size', Math.min(householdInfo.familySize, 5))
        .eq('effective_year', 2026)
        .limit(1)
        .single()
      if (localStd) localHousingStandard = localStd.allowance
    }

    // Run the calculation pipeline
    const results = runCalculationPipeline(calculationInput, localHousingStandard)

    // Upsert calculated results
    const { error: upsertCalcError } = await supabaseAdmin
      .from('calculated_results')
      .upsert(
        {
          case_id: caseId,
          total_debt: results.totalDebt,
          nre: results.nre,
          mdi: results.mdi,
          rcp: results.rcp,
          csed: results.csed,
          ia: results.ia,
          oic: results.oic,
          penalties: results.penalties,
          is_low_income: results.isLowIncome,
          computed_at: results.computedAt,
        },
        { onConflict: 'case_id' }
      )

    if (upsertCalcError) {
      console.error('Failed to upsert calculated_results:', upsertCalcError)
      return NextResponse.json({ error: 'Failed to save calculated results' }, { status: 500 })
    }

    // Upsert eligibility results (one row per program)
    const eligibilityRows = results.eligibility.map((e) => ({
      case_id: caseId,
      program: e.program,
      eligible: e.eligible,
      confidence: e.confidence,
      reasons: e.reasons,
      advantages: e.advantages,
      disadvantages: e.disadvantages,
      monthly_payment: e.monthlyPayment ?? null,
      total_payment: e.totalPayment ?? null,
      term_months: e.termMonths ?? null,
      computed_at: results.computedAt,
    }))

    const { error: upsertEligError } = await supabaseAdmin
      .from('eligibility_results')
      .upsert(eligibilityRows, { onConflict: 'case_id,program' })

    if (upsertEligError) {
      console.error('Failed to upsert eligibility_results:', upsertEligError)
      return NextResponse.json({ error: 'Failed to save eligibility results' }, { status: 500 })
    }

    return NextResponse.json(results)
  } catch (err) {
    console.error('Calculation API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
