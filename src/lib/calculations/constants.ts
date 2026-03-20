export const IRS_2026 = {
  OIC_APPLICATION_FEE: 205,
  PASSPORT_THRESHOLD: 66_000,
  IA_SETUP_FEES: { onlineDDIA: 22, online: 69, phoneDDIA: 107, phone: 178 },
  GUARANTEED_IA_MAX: 10_000,
  STREAMLINED_IA_MAX: 50_000,
  EXPANDED_IA_MAX: 100_000,
  NON_STREAMLINED_IA_MAX: 250_000,
  SHORT_TERM_DAYS: 180,
  QSV_MULTIPLIER: 0.80,
  EARLY_WITHDRAWAL_PENALTY: 0.10,
  FTF_MIN_PENALTY: 485,
  LUMP_SUM_MONTHS: 12,
  PERIODIC_MONTHS: 24,
  CSED_DAYS: 3650,
  OOP_HEALTHCARE: { under65: 84, over65: 149 },
  VEHICLE_OWNERSHIP: 662,
  REINSTATEMENT_FEES: { online: 89, phone: 130 },
  IA_TERMS: { guaranteed: 36, streamlined: 72, expanded: 84, nonStreamlined: 120 },
  DDIA_REQUIRED_THRESHOLD: 25_000,
  FPL_250: { 1: 39900, 2: 54100, 3: 68300, 4: 82500, perAdditional: 14200 },
  // National Standards brackets
  INCOME_BRACKETS: [
    { min: 0, max: 1667, label: 'Under $1,667' },
    { min: 1667, max: 2499, label: '$1,667-$2,499' },
    { min: 2500, max: 3332, label: '$2,500-$3,332' },
    { min: 3333, max: 4166, label: '$3,333-$4,166' },
    { min: 4167, max: 5832, label: '$4,167-$5,832' },
    { min: 5833, max: 7499, label: '$5,833-$7,499' },
    { min: 7500, max: 8332, label: '$7,500-$8,332' },
    { min: 8333, max: Infinity, label: '$8,333+' },
  ],
  // National Standards food/clothing/misc (8 brackets x 4 family sizes + per-additional)
  NATIONAL_STANDARDS: [
    [735, 1143, 1263, 1570, 361],
    [821, 1230, 1362, 1649, 382],
    [860, 1278, 1392, 1710, 399],
    [922, 1329, 1475, 1800, 421],
    [987, 1440, 1577, 1929, 436],
    [1041, 1501, 1648, 2013, 445],
    [1041, 1520, 1670, 2052, 452],
    [1089, 1594, 1738, 2121, 468],
  ],
  COMMUNITY_PROPERTY_STATES: ['AZ', 'CA', 'ID', 'LA', 'NV', 'NM', 'TX', 'WA', 'WI'],
  STATE_TO_CENSUS_REGION: {
    CT: 'northeast', ME: 'northeast', MA: 'northeast', NH: 'northeast', RI: 'northeast', VT: 'northeast',
    NJ: 'northeast', NY: 'northeast', PA: 'northeast',
    IL: 'midwest', IN: 'midwest', MI: 'midwest', OH: 'midwest', WI: 'midwest',
    IA: 'midwest', KS: 'midwest', MN: 'midwest', MO: 'midwest', NE: 'midwest', ND: 'midwest', SD: 'midwest',
    DE: 'south', FL: 'south', GA: 'south', MD: 'south', NC: 'south', SC: 'south', VA: 'south', DC: 'south', WV: 'south',
    AL: 'south', KY: 'south', MS: 'south', TN: 'south', AR: 'south', LA: 'south', OK: 'south', TX: 'south',
    AZ: 'west', CO: 'west', ID: 'west', MT: 'west', NV: 'west', NM: 'west', UT: 'west', WY: 'west',
    AK: 'west', CA: 'west', HI: 'west', OR: 'west', WA: 'west',
  } as Record<string, string>,
} as const;

// ---------------------------------------------------------------------------
// CSED (Collection Statute Expiration Date) — IRC § 6502(a)(1)
// ---------------------------------------------------------------------------

/** Statutory collection period in days (10 years). */
export const CSED_STATUTE_DAYS = 3650;

/** Extra tolling days added after an OIC rejection / withdrawal. IRM 5.8.1.2.4. */
export const OIC_EXTRA_TOLLING_DAYS = 30;

/** Extra tolling days added after a bankruptcy stay lifts. 11 USC § 362. */
export const BANKRUPTCY_EXTRA_TOLLING_DAYS = 180;

// ---------------------------------------------------------------------------
// Penalty Rates — Failure to File (FTF) — IRC § 6651(a)(1)
// ---------------------------------------------------------------------------

/** FTF rate per month (or partial month) late. */
export const FTF_RATE_PER_MONTH = 0.05;

/** Reduced FTF rate when FTP runs concurrently. IRC § 6651(c)(1). */
export const FTF_CONCURRENT_RATE_PER_MONTH = 0.045;

/** FTF maximum as a fraction of unpaid tax. */
export const FTF_MAX_FRACTION = 0.25;

/** Minimum FTF penalty for returns filed 60+ days late. Rev. Proc. 2023-34. */
export const FTF_MINIMUM_PENALTY = 485;

/** Threshold in months (60 days) that triggers the minimum FTF penalty. */
export const FTF_MINIMUM_PENALTY_MONTHS_THRESHOLD = 2;

// ---------------------------------------------------------------------------
// Penalty Rates — Failure to Pay (FTP) — IRC § 6651(a)(2)
// ---------------------------------------------------------------------------

/** Standard FTP rate per month. */
export const FTP_RATE_PER_MONTH = 0.005;

/** Increased FTP rate after levy notice + 10 days. IRC § 6651(d). */
export const FTP_POST_LEVY_RATE_PER_MONTH = 0.01;

/** Reduced FTP rate while in an Installment Agreement. IRC § 6651(h). */
export const FTP_IA_RATE_PER_MONTH = 0.0025;

/** FTP maximum as a fraction of unpaid tax. */
export const FTP_MAX_FRACTION = 0.25;

// ---------------------------------------------------------------------------
// Misc penalty constants
// ---------------------------------------------------------------------------

/** Number of prior tax years checked for FTA eligibility. */
export const FTA_LOOKBACK_YEARS = 3;

/** Days in a "penalty month" for FTF/FTP partial-month rounding. */
export const DAYS_PER_PENALTY_MONTH = 30;
