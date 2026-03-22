'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Edge case content definitions                                      */
/* ------------------------------------------------------------------ */

interface FormReference {
  name: string
  description: string
}

interface EdgeCaseContent {
  title: string
  category: string
  overview: string
  whenApplies: string[]
  whatToDo: string[]
  requiredForms: FormReference[]
  timeline: string
  keyFacts: { label: string; description: string }[]
  warnings: string[]
  expertReferral: string
}

const EDGE_CASES: Record<string, EdgeCaseContent> = {
  'sfr-dispute': {
    title: 'Substitute for Return (SFR) Dispute',
    category: 'Filing',
    overview: 'When you do not file a required tax return, the IRS may file a Substitute for Return (SFR) on your behalf using information from W-2s, 1099s, and other third-party documents. SFRs typically result in a higher tax liability because they use the least favorable filing status (Single or Married Filing Separately) and do not include deductions, credits, or exemptions you may be entitled to.',
    whenApplies: [
      'The IRS filed a return on your behalf (TC 150 with SFR indicator on your transcript)',
      'You never filed the original return for one or more tax years',
      'Your account shows an assessed balance based on SFR figures',
      'You received a CP2566 or CP3219A notice (Notice of Deficiency)',
    ],
    whatToDo: [
      'Obtain your Wage & Income transcript for each SFR year to see what income the IRS used',
      'Prepare and file your original return (Form 1040) — include all deductions, credits, and proper filing status',
      'If the assessment has already been made, file an amended return or request audit reconsideration',
      'Wait 4-12 weeks for the IRS to process and adjust your balance',
      'If the balance decreases significantly, reassess your resolution options',
    ],
    requiredForms: [
      { name: 'Form 1040', description: 'Original individual income tax return for the SFR year(s)' },
      { name: 'Form 1040-X', description: 'Amended return if the original SFR assessment has already posted' },
      { name: 'Form 4506-T', description: 'Request for Transcript of Tax Return (to obtain W&I transcript)' },
    ],
    timeline: '4-12 weeks for IRS to process the original return and adjust the balance. Complex cases may take longer.',
    keyFacts: [
      { label: 'Filing Status', description: 'SFRs use Single or MFS — you may qualify for Head of Household or MFJ, which could significantly reduce your tax.' },
      { label: 'No Deductions', description: 'SFRs do not include itemized deductions, standard deduction may be limited, and no credits (EITC, CTC, etc.) are applied.' },
      { label: 'Assessment Date', description: 'Filing the original return resets the assessment date, which starts a new 10-year CSED for that tax year.' },
    ],
    warnings: [
      'Filing the original return may increase your tax in rare cases — verify before filing.',
      'The assessment date reset means a new 10-year CSED, so weigh this against CSED strategies.',
    ],
    expertReferral: 'Consider consulting a tax professional if you have multiple SFR years or complex income situations.',
  },

  'fbar-penalties': {
    title: 'FBAR Penalties',
    category: 'International',
    overview: 'The Foreign Bank Account Report (FBAR / FinCEN Form 114) must be filed annually by U.S. persons who have a financial interest in or signature authority over foreign financial accounts with an aggregate value exceeding $10,000 at any point during the calendar year. Failure to file can result in severe civil and criminal penalties.',
    whenApplies: [
      'You have foreign bank accounts, investment accounts, or financial assets exceeding $10,000 in aggregate',
      'You received a penalty notice for failure to file FBAR',
      'You have unreported foreign income or assets',
      'You are a U.S. citizen, resident, or green card holder with overseas accounts',
    ],
    whatToDo: [
      'Determine if you qualify for the IRS Streamlined Filing Compliance Procedures (reduced or no penalties)',
      'If non-willful, file under Streamlined Domestic Offshore Procedures (5% penalty) or Streamlined Foreign Offshore (no penalty)',
      'File delinquent FBARs for the last 6 years via FinCEN BSA E-Filing System',
      'Amend prior year tax returns to report previously unreported foreign income',
      'Consider voluntary disclosure if willful non-compliance is involved',
    ],
    requiredForms: [
      { name: 'FinCEN Form 114', description: 'Foreign Bank Account Report — filed electronically via BSA E-Filing' },
      { name: 'Form 1040-X', description: 'Amended returns for years with unreported foreign income' },
      { name: 'Form 14653', description: 'Certification by U.S. Person for Streamlined Domestic Offshore Procedures' },
      { name: 'Form 14654', description: 'Certification by U.S. Person for Streamlined Foreign Offshore Procedures' },
      { name: 'Form 8938', description: 'Statement of Specified Foreign Financial Assets (FATCA)' },
    ],
    timeline: 'Streamlined filing: 3-6 months for IRS processing. Voluntary disclosure: 12-24 months.',
    keyFacts: [
      { label: 'Non-Willful Penalty', description: 'Up to $10,000 per account per year. Streamlined procedures can reduce or eliminate.' },
      { label: 'Willful Penalty', description: 'Greater of $100,000 or 50% of account balance per year. Criminal prosecution possible.' },
      { label: 'Streamlined Program', description: 'Requires certification of non-willful conduct. Covers 3 years of returns and 6 years of FBARs.' },
    ],
    warnings: [
      'FBAR penalties can be more than the account balance itself for willful violations.',
      'Do NOT file delinquent FBARs without understanding the penalty implications — wrong approach can worsen your situation.',
    ],
    expertReferral: 'Strongly recommend consulting an international tax attorney or CPA before taking any action on FBAR issues.',
  },

  'deceased-taxpayer': {
    title: 'Deceased Taxpayer',
    category: 'Special Circumstances',
    overview: 'When a taxpayer passes away with outstanding tax obligations, the surviving spouse, executor, or personal representative may need to file final returns, claim refunds, or resolve remaining tax debt. The IRS has specific procedures for handling deceased taxpayer accounts.',
    whenApplies: [
      'A taxpayer with outstanding tax debt has passed away',
      'You are the surviving spouse, executor, or personal representative',
      'A final tax return needs to be filed for the deceased',
      'There is a refund due to the deceased taxpayer',
    ],
    whatToDo: [
      'Notify the IRS of the death by sending a copy of the death certificate',
      'File the final Form 1040 for the year of death (write "DECEASED" across the top)',
      'If claiming a refund, file Form 1310 (Statement of Person Claiming Refund Due a Deceased Taxpayer)',
      'Request a payoff balance from the IRS to determine the full amount owed',
      'If the estate cannot pay, the executor may request OIC or CNC on behalf of the estate',
    ],
    requiredForms: [
      { name: 'Form 1040', description: 'Final individual income tax return for the year of death' },
      { name: 'Form 1310', description: 'Statement of Person Claiming Refund Due a Deceased Taxpayer' },
      { name: 'Form 56', description: 'Notice Concerning Fiduciary Relationship (appoints representative)' },
      { name: 'Form 1041', description: 'U.S. Income Tax Return for Estates and Trusts (if estate has income)' },
    ],
    timeline: '8-16 weeks for final return processing. Estate resolution may take 6-12 months.',
    keyFacts: [
      { label: 'Joint Returns', description: 'Surviving spouse can file a joint return for the year of death, potentially reducing the tax liability.' },
      { label: 'Estate Liability', description: 'The estate is liable for the deceased\'s tax debt. Personal liability of heirs is generally limited to assets received.' },
      { label: 'CSED Continues', description: 'The Collection Statute Expiration Date continues to run against the deceased taxpayer\'s account.' },
    ],
    warnings: [
      'Do not distribute estate assets before resolving tax obligations — the IRS can pursue transferees.',
      'Surviving spouse may be jointly liable for taxes on joint returns filed during the marriage.',
    ],
    expertReferral: 'Consider consulting an estate attorney or tax professional experienced with deceased taxpayer issues.',
  },

  'military-scra': {
    title: 'Military SCRA Protections',
    category: 'Special Circumstances',
    overview: 'The Servicemembers Civil Relief Act (SCRA) provides significant protections to active duty military personnel regarding tax collection. These include interest rate reductions, deferral of collection activity, and protection against certain tax proceedings during military service.',
    whenApplies: [
      'You are an active duty member of the U.S. Armed Forces',
      'Your military service affects your ability to pay taxes or respond to IRS actions',
      'You were on active duty when the tax obligation was incurred (for pre-service debts)',
      'You need additional time to file returns or respond to IRS notices due to deployment',
    ],
    whatToDo: [
      'Notify the IRS of your active duty status and request SCRA protections',
      'Request interest rate reduction to 6% on pre-service tax debt during active duty',
      'Request deferral of collection activity during service and 180 days after',
      'File for combat zone tax deadline extensions if deployed to a designated combat zone',
      'Contact the Taxpayer Advocate Service (TAS) for military-specific assistance',
    ],
    requiredForms: [
      { name: 'Form 911', description: 'Request for Taxpayer Advocate Service Assistance' },
      { name: 'Written SCRA Request', description: 'Letter to IRS with military orders requesting SCRA protections' },
      { name: 'DD Form 214', description: 'Certificate of Release or Discharge from Active Duty (if separated)' },
    ],
    timeline: 'SCRA protections are immediate upon request with valid military orders. Processing: 2-4 weeks.',
    keyFacts: [
      { label: '6% Interest Rate Cap', description: 'Interest on pre-service tax debt is capped at 6% during active duty. Excess interest is forgiven, not deferred.' },
      { label: 'Collection Deferral', description: 'The IRS must defer collection activity during active duty service plus 180 days after separation.' },
      { label: 'Combat Zone Extensions', description: 'Deadlines for filing, paying, and responding to IRS are extended for the period of combat zone service plus 180 days.' },
    ],
    warnings: [
      'SCRA protections must be actively requested — they are not applied automatically.',
      'Protections apply to pre-service debts; taxes incurred during service may not qualify for all benefits.',
    ],
    expertReferral: 'Military legal assistance offices (JAG) can help with SCRA requests at no cost.',
  },

  'revenue-officer': {
    title: 'Revenue Officer Assigned',
    category: 'Collection',
    overview: 'A Revenue Officer (RO) is an IRS field agent who personally handles collection of significant tax debts. RO assignment typically indicates the IRS considers your case high-priority. ROs have broader enforcement powers than automated collection, including the ability to seize assets, file liens, and issue summons.',
    whenApplies: [
      'You received a visit or letter from an IRS Revenue Officer',
      'Your case was assigned to IRS Field Collection (typically debts > $250K or complex cases)',
      'An RO has contacted you requesting financial information',
      'You have been summoned to provide records or appear at an IRS office',
    ],
    whatToDo: [
      'Do NOT ignore the Revenue Officer — this will escalate enforcement actions',
      'Request the RO\'s credentials (pocket commission and HSPD-12 card) to verify identity',
      'Cooperate with reasonable requests for financial information',
      'Request a reasonable deadline for gathering documents (typically 30 days)',
      'If the RO is unreasonable or abusive, file Form 911 to request Taxpayer Advocate Service (TAS) assistance',
      'Consider hiring a tax professional (EA, CPA, or attorney) to represent you before the RO',
    ],
    requiredForms: [
      { name: 'Form 911', description: 'Request for Taxpayer Advocate Service Assistance (if experiencing hardship)' },
      { name: 'Form 433-A', description: 'Collection Information Statement (the RO will likely request this)' },
      { name: 'Form 12153', description: 'Request for Collection Due Process Hearing (if lien/levy issued)' },
      { name: 'Form 2848', description: 'Power of Attorney (to authorize a representative to deal with the RO)' },
    ],
    timeline: 'RO cases are actively worked. Expect contact within 30 days and ongoing communication.',
    keyFacts: [
      { label: 'Your Rights', description: 'You have the right to representation, the right to record conversations (with notice), and all Taxpayer Bill of Rights protections.' },
      { label: 'Seizure Authority', description: 'ROs can seize assets (real estate, vehicles, bank accounts) — but must follow specific IRS procedures and approve through management.' },
      { label: 'TAS Assistance', description: 'The Taxpayer Advocate Service can intervene if the RO\'s actions cause significant hardship or violate your rights.' },
    ],
    warnings: [
      'Never lie to or mislead a Revenue Officer — this can result in criminal referral.',
      'Do not transfer or hide assets — asset dissipation can be treated as fraud.',
    ],
    expertReferral: 'Strongly recommend engaging a tax attorney or Enrolled Agent experienced with field collection cases.',
  },

  'passport-certification': {
    title: 'Passport Certification (Seriously Delinquent Tax Debt)',
    category: 'Collection',
    overview: 'Under IRC 7345, the IRS can certify seriously delinquent tax debt to the State Department, which can deny issuance or renewal of your passport, and in extreme cases, revoke an existing passport. The current threshold is $62,000 (adjusted annually for inflation, approximately $66,000 in 2026).',
    whenApplies: [
      'You owe more than $66,000 in assessed federal tax debt (including penalties and interest)',
      'Your passport application was denied or you received a CP508C notice',
      'You have a Notice of Federal Tax Lien filed and all administrative remedies are exhausted',
      'You have been issued a levy and the debt remains unpaid',
    ],
    whatToDo: [
      'Enter into an approved resolution (IA, OIC, or CNC) — this decertifies your debt',
      'If debt is below the threshold, request decertification',
      'Request a Collection Due Process hearing if you disagree with the underlying assessment',
      'If traveling soon, contact the IRS immediately and explain the urgency',
      'Consider paying down the balance below the threshold amount',
    ],
    requiredForms: [
      { name: 'Form 9465', description: 'Installment Agreement Request (to enter approved payment plan)' },
      { name: 'Form 656', description: 'Offer in Compromise (to settle the debt)' },
      { name: 'Form 12153', description: 'Request for CDP Hearing' },
    ],
    timeline: 'Decertification after entering a resolution: 30-45 days for IRS to notify State Department.',
    keyFacts: [
      { label: 'Threshold (2026)', description: 'Approximately $66,000 including tax, penalties, and interest. Adjusted annually for inflation.' },
      { label: 'Automatic Decertification', description: 'Entering an IA, having an OIC pending, or being in CNC status automatically qualifies for decertification.' },
      { label: 'Emergency Travel', description: 'If you have imminent travel, the State Department may issue a limited passport for emergency or humanitarian reasons.' },
    ],
    warnings: [
      'This applies to both new passport applications and renewals.',
      'The IRS does not need to warn you before certifying — the CP508C notice may arrive after certification.',
    ],
    expertReferral: 'A tax professional can expedite the decertification process if you have urgent travel needs.',
  },

  'injured-spouse': {
    title: 'Injured Spouse Relief',
    category: 'Joint Returns',
    overview: 'If you filed a joint return and your share of the refund was applied to your spouse\'s individual debt (past-due child support, student loans, or separate tax debt), you may be an "injured spouse" entitled to recover your portion of the refund. This is different from "innocent spouse" relief.',
    whenApplies: [
      'Your joint refund was offset to pay your spouse\'s (not your) individual debts',
      'You received a Notice of Offset showing your refund was applied to your spouse\'s past-due obligations',
      'You are not responsible for the debt that triggered the offset',
      'You had income, withholding, or credits on the joint return',
    ],
    whatToDo: [
      'File Form 8379 (Injured Spouse Allocation) to claim your share of the joint refund',
      'You can file Form 8379 with your original return or after the offset occurs',
      'Gather documentation of your individual income, withholding, and credits',
      'If filing after offset, mail Form 8379 to the IRS service center for your area',
      'For future years, consider filing Form 8379 proactively with your joint return',
    ],
    requiredForms: [
      { name: 'Form 8379', description: 'Injured Spouse Allocation — allocates joint return items between spouses' },
    ],
    timeline: '8-14 weeks if filed with original return. 8-14 weeks if filed separately after offset.',
    keyFacts: [
      { label: 'Injured vs. Innocent', description: 'Injured Spouse = your refund was taken for your spouse\'s debt. Innocent Spouse (Form 8857) = you want relief from joint tax liability.' },
      { label: 'Community Property', description: 'In community property states (AZ, CA, ID, LA, NV, NM, TX, WA, WI), allocation rules differ and may reduce your recovery.' },
      { label: 'Retroactive', description: 'You can file Form 8379 for prior years if the statute of limitations has not expired (generally 3 years from filing or 2 years from payment).' },
    ],
    warnings: [
      'Form 8379 must be filed for each year you want to claim injured spouse relief — it does not apply automatically to future years.',
      'Do not confuse with Form 8857 (Innocent Spouse Relief), which is for entirely different situations.',
    ],
    expertReferral: 'Most taxpayers can file Form 8379 on their own. Consult a professional if community property rules apply.',
  },

  'audit-recon': {
    title: 'Audit Reconsideration',
    category: 'Disputes',
    overview: 'Audit reconsideration is an IRS process that allows you to request a review of a prior audit assessment if you have new information that was not previously considered, or if you did not participate in the original audit. This is particularly useful for SFR assessments or audits where you did not respond.',
    whenApplies: [
      'An audit was completed without your participation (you did not respond to notices)',
      'You have new documentation that was not available during the original audit',
      'The IRS made a computational or processing error in the audit',
      'An SFR assessment was made and you want to file your original return',
    ],
    whatToDo: [
      'Gather all documentation that supports your position (receipts, records, statements)',
      'Write a letter requesting audit reconsideration, explaining why the audit result is incorrect',
      'Include your original or amended return if not previously filed',
      'Mail the request with supporting documents to the IRS campus that handled the audit',
      'Follow up after 30 days if you have not received acknowledgment',
    ],
    requiredForms: [
      { name: 'Form 1040 / 1040-X', description: 'Original or amended return for the audited year(s)' },
      { name: 'Written Request', description: 'Letter explaining why reconsideration is warranted' },
      { name: 'Supporting Documentation', description: 'All records that support your claimed income, deductions, and credits' },
    ],
    timeline: '3-6 months for initial review. Complex cases may take 6-12 months.',
    keyFacts: [
      { label: 'No Time Limit', description: 'There is no formal deadline to request audit reconsideration — but act promptly as collection continues.' },
      { label: 'Collection Continues', description: 'Unlike an appeal, audit reconsideration does NOT stop collection activity. Consider requesting a hold.' },
      { label: 'Multiple Requests', description: 'You can request reconsideration more than once if you have additional new information.' },
    ],
    warnings: [
      'Audit reconsideration does not have the same formal protections as an appeal — the IRS can deny it without a hearing.',
      'Collection activity continues during reconsideration — consider an IA to protect yourself.',
    ],
    expertReferral: 'A tax professional can help organize your documentation and present the strongest case for reconsideration.',
  },

  'amended-return': {
    title: 'Amended Return (Form 1040-X)',
    category: 'Filing',
    overview: 'Form 1040-X allows you to correct errors on a previously filed tax return. You might need to amend to claim missed deductions or credits, correct income reporting, or change your filing status. An amended return can result in a reduced tax liability or additional refund.',
    whenApplies: [
      'You discovered an error on a previously filed return',
      'You failed to claim deductions or credits you were entitled to',
      'You need to change your filing status',
      'You received a corrected W-2 or 1099 after filing',
      'You want to reduce an SFR assessment by filing an original/amended return',
    ],
    whatToDo: [
      'Wait until your original return has been processed before filing an amendment',
      'Prepare Form 1040-X showing the original amounts, corrected amounts, and explanations',
      'Attach any new or corrected forms and schedules',
      'File Form 1040-X electronically (available for 2019 and later tax years) or by mail',
      'Track your amended return status using the "Where\'s My Amended Return?" tool after 3 weeks',
    ],
    requiredForms: [
      { name: 'Form 1040-X', description: 'Amended U.S. Individual Income Tax Return' },
      { name: 'Supporting Schedules', description: 'Any new or corrected schedules (Schedule A, C, etc.)' },
      { name: 'Corrected Information Returns', description: 'Corrected W-2c, 1099, etc. if applicable' },
    ],
    timeline: 'Up to 16 weeks for processing. E-filed amendments: 8-12 weeks. Paper-filed: 12-16 weeks.',
    keyFacts: [
      { label: 'Statute of Limitations', description: 'Must file within 3 years of the original return due date, or 2 years of the date you paid the tax, whichever is later.' },
      { label: 'E-Filing Available', description: 'Form 1040-X can now be e-filed for tax years 2019 and later (as of 2023).' },
      { label: 'One Year at a Time', description: 'File a separate Form 1040-X for each tax year being amended.' },
    ],
    warnings: [
      'Amending a return may trigger an audit for the amended year.',
      'If you owe additional tax, pay as much as possible with the amended return to minimize interest and penalties.',
    ],
    expertReferral: 'Consider professional help if amending complex returns or if the amendment involves significant dollar amounts.',
  },

  'lien-levy-release': {
    title: 'Lien Withdrawal & Levy Release',
    category: 'Collection',
    overview: 'A federal tax lien (NFTL) is a legal claim against your property, while a levy is an actual seizure of assets. Both can be released, withdrawn, or subordinated under certain conditions. Understanding the process is essential to protecting your financial standing and credit.',
    whenApplies: [
      'A Notice of Federal Tax Lien (NFTL) has been filed against you',
      'Your bank account has been levied (frozen)',
      'Your wages are being garnished by the IRS',
      'You want to sell or refinance property affected by a tax lien',
    ],
    whatToDo: [
      'For lien withdrawal: File Form 12277 (Application for Withdrawal of Filed Form 668(Y))',
      'For lien discharge on specific property: File Form 14135',
      'For levy release: Request levy release by showing economic hardship or entering a resolution',
      'File Form 12153 for a Collection Due Process (CDP) hearing within 30 days of the lien or levy notice',
      'Enter into an Installment Agreement — IRS may withdraw the lien for Streamlined IAs under $25K',
    ],
    requiredForms: [
      { name: 'Form 12277', description: 'Application for Withdrawal of Filed Form 668(Y) — Federal Tax Lien' },
      { name: 'Form 14135', description: 'Application for Certificate of Discharge of Federal Tax Lien' },
      { name: 'Form 12153', description: 'Request for a Collection Due Process or Equivalent Hearing' },
      { name: 'Form 668-D', description: 'Release of Levy/Release of Property from Levy (issued by IRS)' },
    ],
    timeline: 'Levy release: 1-21 days depending on urgency. Lien withdrawal: 30-60 days after approval.',
    keyFacts: [
      { label: 'Lien vs. Levy', description: 'A lien is a claim (public record affecting credit). A levy is a seizure (actually takes your money/property).' },
      { label: 'CDP Hearing', description: 'You have 30 days from the date of the lien/levy notice to request a CDP hearing — this pauses collection.' },
      { label: 'Bank Levy 21-Day Hold', description: 'When a bank levy is issued, the bank holds funds for 21 days before sending to the IRS. Act within this window.' },
    ],
    warnings: [
      'Missing the 30-day CDP deadline means you can only get an "equivalent hearing" which does not allow court review.',
      'A lien remains on your credit report until released — even after the debt is paid, you must request withdrawal.',
    ],
    expertReferral: 'A tax professional or attorney can negotiate levy releases and lien withdrawals, especially in urgent situations.',
  },

  'bankruptcy': {
    title: 'Bankruptcy & Tax Debt',
    category: 'Legal',
    overview: 'Certain tax debts can be discharged (eliminated) in bankruptcy, but only if specific requirements are met. The rules are complex and depend on the type of tax, when the return was filed, and when the tax was assessed. Not all tax debts are dischargeable.',
    whenApplies: [
      'You are considering filing for bankruptcy and have outstanding tax debt',
      'You are currently in bankruptcy and want to understand how your tax debt is handled',
      'You want to determine if your tax debt qualifies for discharge',
      'You filed for Chapter 7 or Chapter 13 bankruptcy',
    ],
    whatToDo: [
      'Determine if your tax debt meets ALL of the discharge eligibility rules (3-year, 2-year, 240-day)',
      'Obtain transcripts for each tax year to verify assessment dates and return filing dates',
      'Consult a bankruptcy attorney who specializes in tax debt discharge',
      'If eligible, ensure the tax debt is properly listed in your bankruptcy petition',
      'If not eligible, explore Chapter 13 repayment plan or post-bankruptcy resolution options',
    ],
    requiredForms: [
      { name: 'Bankruptcy Petition', description: 'Filed through the U.S. Bankruptcy Court (with attorney assistance)' },
      { name: 'Form 4506-T', description: 'Request for Transcript — to verify filing dates and assessment dates' },
      { name: 'Proof of Claim', description: 'IRS files this in your bankruptcy case stating the amount owed' },
    ],
    timeline: 'Chapter 7: 3-4 months. Chapter 13: 3-5 year repayment plan. Discharge determination varies.',
    keyFacts: [
      { label: '3-Year Rule', description: 'The tax return must have been due at least 3 years before the bankruptcy filing date (including extensions).' },
      { label: '2-Year Rule', description: 'The tax return must have been actually filed at least 2 years before the bankruptcy filing date.' },
      { label: '240-Day Rule', description: 'The tax must have been assessed at least 240 days before the bankruptcy filing date. Certain events (OIC, prior bankruptcy) toll this period.' },
      { label: 'No Fraud', description: 'The return must not be fraudulent and the taxpayer must not have willfully evaded the tax.' },
    ],
    warnings: [
      'Tax liens that were filed BEFORE bankruptcy survive the discharge — the lien remains on your property even if the personal liability is discharged.',
      'SFR returns may not qualify as "filed" for the 2-year rule — you may need to file the original return first.',
      'Payroll taxes (trust fund recovery penalty) are NEVER dischargeable in bankruptcy.',
    ],
    expertReferral: 'Bankruptcy and tax law intersection is extremely complex. Strongly recommend a bankruptcy attorney with tax expertise.',
  },
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function EdgeCasePage() {
  const params = useParams()
  const edgeType = params.type as string
  const content = EDGE_CASES[edgeType]

  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFF] px-4">
        <div className="text-center space-y-4">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-[#F0F0F5]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8585A0]">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Topic Not Found</h1>
          <p className="text-[#5C5C7A]">The edge case type &quot;{edgeType}&quot; is not recognized.</p>
          <Link href="/dashboard" className="inline-block rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-medium text-white hover:bg-[#1D4ED8] transition">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFF] px-4 py-8">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        {/* Back Navigation */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-[#5C5C7A] hover:text-[#1A1A2E] transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-[#2563EB]/15 px-3 py-0.5 text-xs font-semibold text-[#2563EB]">
              {content.category}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">{content.title}</h1>
        </div>

        {/* Overview */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-3">Overview</h2>
          <p className="text-sm text-[#334155] leading-relaxed">{content.overview}</p>
        </div>

        {/* When This Applies */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">When This Applies</h2>
          <div className="space-y-2">
            {content.whenApplies.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-[#D5D5E0] bg-[#FAFAFF] p-3">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15 mt-0.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-sm text-[#334155]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What To Do */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">What to Do</h2>
          <div className="space-y-3">
            {content.whatToDo.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-[#FAFAFF] border border-[#D5D5E0] p-4">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15 text-xs font-bold text-[#2563EB]">
                  {i + 1}
                </span>
                <p className="text-sm text-[#334155] pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Facts */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Key Facts</h2>
          <div className="space-y-3">
            {content.keyFacts.map((fact) => (
              <div key={fact.label} className="rounded-xl border border-[#D5D5E0] bg-[#FAFAFF] p-4">
                <h3 className="text-sm font-semibold text-[#1A1A2E]">{fact.label}</h3>
                <p className="mt-1 text-sm text-[#5C5C7A]">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Required Forms */}
        <div className="rounded-2xl border border-[#D5D5E0] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Required Forms</h2>
          <div className="space-y-2">
            {content.requiredForms.map((form) => (
              <div key={form.name} className="flex items-center gap-3 rounded-lg border border-[#D5D5E0] bg-[#FAFAFF] p-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/15">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A2E]">{form.name}</p>
                  <p className="text-xs text-[#8585A0]">{form.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-xl border border-[#D5D5E0] bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#1A1A2E]">Expected Timeline</h3>
              <p className="text-sm text-[#5C5C7A]">{content.timeline}</p>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {content.warnings.length > 0 && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <h2 className="text-lg font-semibold text-amber-400 mb-4">Important Warnings</h2>
            <div className="space-y-3">
              {content.warnings.map((warning, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-amber-400">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <p className="text-sm text-[#334155]">{warning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expert Referral */}
        <div className="rounded-2xl border border-blue-500/20 bg-[#2563EB]/5 p-6">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB]/15">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#2563EB]">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#1A1A2E]">Need Expert Help?</h2>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">{content.expertReferral}</p>
              <button className="mt-4 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1D4ED8] transition">
                Find a Tax Professional
              </button>
            </div>
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="pb-8">
          <Link
            href="/dashboard"
            className="block w-full rounded-xl border border-[#D5D5E0] bg-white py-4 text-center text-base font-medium text-[#334155] transition-colors hover:bg-[#F0F0F5]"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
