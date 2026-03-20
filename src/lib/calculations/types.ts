// Input types (from database)
export interface BankAccount { id: string; balance: number; isJoint: boolean; }
export interface Investment { id: string; currentValue: number; loanBalance: number; isLiquid: boolean; }
export interface RetirementAccount { id: string; currentValue: number; loanBalance: number; ownerAge: number; earlyWithdrawalPenaltyPct: number; estimatedTaxRatePct: number; }
export interface RealEstate { id: string; fmv: number; mortgageBalance: number; helocBalance: number; isJoint: boolean; }
export interface Vehicle { id: string; fmv: number; loanBalance: number; }
export interface LifeInsurance { id: string; policyType: 'Whole' | 'Universal' | 'Term'; cashSurrenderValue: number; policyLoans: number; }
export interface CryptoAsset { id: string; estimatedValue: number; }
export interface OtherAsset { id: string; estimatedValue: number; loanBalance: number; }

export interface AssetPortfolio {
  bankAccounts: BankAccount[];
  investments: Investment[];
  retirementAccounts: RetirementAccount[];
  realEstate: RealEstate[];
  vehicles: Vehicle[];
  lifeInsurance: LifeInsurance[];
  cryptoAssets: CryptoAsset[];
  otherAssets: OtherAsset[];
}

export interface IncomeRecord {
  person: 'taxpayer' | 'spouse';
  incomeType: string;
  grossMonthly: number;
  federalWithholding?: number;
  stateWithholding?: number;
  ficaWithholding?: number;
}

export interface ExpenseRecord {
  category: ExpenseCategory;
  actualAmount: number;
  irsAllowableAmount?: number;
}

export type ExpenseCategory = 'FoodClothingMisc' | 'HousingUtilities' | 'VehicleOwnership' | 'VehicleOperating' | 'PublicTransportation' | 'HealthInsurance' | 'OOPHealthcare' | 'CourtOrdered' | 'ChildDependentCare' | 'TermLifeInsurance' | 'CurrentYearTaxes' | 'SecuredDebt' | 'StudentLoans' | 'UnionDues' | 'MandatoryRetirement' | 'Other';

export interface TaxDebt {
  id: string;
  taxYear: number;
  taxForm: string;
  balance: number;
  taxPrincipal: number;
  penaltyAmount: number;
  interestAmount: number;
  assessmentDate: string; // ISO date
  isSfr: boolean;
  trustFundPortion?: number;
  nonTrustFundPortion?: number;
  csedDate?: string;
}

export interface TollingEvent {
  eventType: 'OIC_Pending' | 'Bankruptcy_Active' | 'CDP_Hearing' | 'Innocent_Spouse' | 'Litigation' | 'Military_Deferment' | 'Outside_US';
  startDate: string;
  endDate?: string;
}

export interface HouseholdInfo {
  familySize: number;
  membersUnder17: number;
  members65Plus: number;
  state: string;
  county: string;
  censusRegion: 'northeast' | 'midwest' | 'south' | 'west';
  numVehicles: number;
  housingType: 'Own' | 'Rent' | 'Other';
  grossMonthlyIncomeBracket: string;
}

export interface PreQualifierAnswers {
  allReturnsFiled: boolean;
  inBankruptcy: boolean;
  estimatedPaymentsCurrent: boolean;
  auditOpen: boolean;
  hasActiveIA: boolean;
  oicPending: boolean;
  hasPriorPenalties: boolean;
  cncStatus: boolean;
  hasNFTL: boolean;
  levyNotice: boolean;
  activeGarnishment: boolean;
  bankLevy: boolean;
  usCitizen: boolean;
  livingAbroad: boolean;
  assetTransfers: boolean;
  stateReturns: boolean;
}

// Output types
export interface QSVResult { assetId: string; assetType: string; qsv: number; }
export interface NREResult { totalNRE: number; breakdown: QSVResult[]; }
export interface MDIResult { totalIncome: number; totalAllowableExpenses: number; mdi: number; expenseBreakdown: { category: string; actual: number; allowable: number; standard: number; }[]; notes?: string[]; }
export interface RCPResult { nre: number; futureIncomeLumpSum: number; futureIncomePeriodic: number; rcpLumpSum: number; rcpPeriodic: number; }
export interface CSEDResult { taxDebtId: string; taxYear: number; baseCSED: string; adjustedCSED: string; totalTollingDays: number; remainingMonths: number; isExpired: boolean; }

export interface IAResult {
  recommendedType: IAType;
  monthlyPayment: number;
  termMonths: number;
  totalPayment: number;
  setupFee: number;
  ddiaRequired: boolean;
  financialDisclosureRequired: boolean;
  allTypes: IATypeAnalysis[];
}

export type IAType = 'ShortTermPlan' | 'GuaranteedIA' | 'StreamlinedIA' | 'ExpandedStreamlinedIA' | 'NonStreamlinedIA' | 'RegularIA' | 'PPIA';

export interface IATypeAnalysis {
  type: IAType;
  eligible: boolean;
  monthlyPayment: number;
  termMonths: number;
  reasons: string[];
}

export interface OICResult {
  minimumOffer: number;
  rcpLumpSum: number;
  rcpPeriodic: number;
  applicationFee: number;
  isLowIncome: boolean;
  feeWaived: boolean;
  initialPaymentLumpSum: number;
  initialPaymentPeriodic: number;
}

export interface PenaltyResult {
  taxYear: number;
  ftfAmount: number;
  ftpAmount: number;
  totalPenalties: number;
  ftaEligible: boolean;
}

export type ProgramType = 'ShortTermPlan' | 'GuaranteedIA' | 'StreamlinedIA' | 'ExpandedStreamlinedIA' | 'NonStreamlinedIA' | 'RegularIA' | 'PPIA' | 'OIC_DATC' | 'OIC_DATL' | 'OIC_ETA' | 'CNC' | 'PenaltyAbatement_FTA' | 'PenaltyAbatement_RC' | 'InnocentSpouse';

export interface EligibilityResult {
  program: ProgramType;
  eligible: boolean;
  confidence: number;
  reasons: string[];
  advantages: string[];
  disadvantages: string[];
  monthlyPayment?: number;
  totalPayment?: number;
  termMonths?: number;
}

export interface CalculationInput {
  assets: AssetPortfolio;
  income: IncomeRecord[];
  expenses: ExpenseRecord[];
  taxDebts: TaxDebt[];
  tollingEvents: Record<string, TollingEvent[]>;
  household: HouseholdInfo;
  preQualifier: PreQualifierAnswers;
  filingStatus: string;
  taxpayerType: 'Individual' | 'Business';
}

export interface CalculationOutput {
  nre: NREResult;
  mdi: MDIResult;
  rcp: RCPResult;
  csed: CSEDResult[];
  ia: IAResult;
  oic: OICResult;
  penalties: PenaltyResult[];
  eligibility: EligibilityResult[];
  isLowIncome: boolean;
  totalDebt: number;
  computedAt: string;
}
