/**
 * Collection Statute Expiration Date (CSED) Calculator
 *
 * Per IRC § 6502(a)(1), the IRS generally has 10 years from the date of
 * assessment to collect a tax debt.  Certain events — offers in compromise,
 * bankruptcies, CDP hearings, and others — "toll" (pause) the statute,
 * effectively extending the CSED by the duration of the tolling period
 * (plus any statutory grace days that follow).
 *
 * This module computes the adjusted CSED for each tax debt, accounting for
 * all applicable tolling events while correctly handling overlapping intervals
 * so that no single calendar day is counted more than once.
 */

import {
  addDays,
  differenceInCalendarDays,
  differenceInMonths,
  parseISO,
  isBefore,
  isEqual,
} from 'date-fns';

import type { TaxDebt, TollingEvent, CSEDResult } from '@/lib/calculations/types';
import {
  CSED_STATUTE_DAYS,
  OIC_EXTRA_TOLLING_DAYS,
  BANKRUPTCY_EXTRA_TOLLING_DAYS,
} from '@/lib/calculations/constants';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Represents a contiguous tolling interval as epoch-day boundaries. */
interface DayInterval {
  start: number; // inclusive
  end: number;   // inclusive
}

/**
 * Returns the number of extra grace days the IRS adds after a tolling event
 * ends, based on the event type.
 *
 * - OIC_Pending  → +30 days  (IRM 5.8.1.2.4)
 * - Bankruptcy   → +180 days (11 USC § 362)
 * - All others   → 0
 */
function extraTollingDays(eventType: TollingEvent['eventType']): number {
  switch (eventType) {
    case 'OIC_Pending':
      return OIC_EXTRA_TOLLING_DAYS;
    case 'Bankruptcy_Active':
      return BANKRUPTCY_EXTRA_TOLLING_DAYS;
    default:
      return 0;
  }
}

/**
 * Converts a tolling event into a DayInterval (in "days since epoch") that
 * includes any event-type-specific grace days appended to the end.
 *
 * If the event has no endDate the interval extends through today (inclusive)
 * plus any applicable grace days.
 */
function eventToInterval(event: TollingEvent, today: Date): DayInterval {
  const start = parseISO(event.startDate);
  const end = event.endDate ? parseISO(event.endDate) : today;

  const extra = extraTollingDays(event.eventType);

  return {
    start: start.getTime(),
    end: addDays(end, extra).getTime(),
  };
}

/**
 * Merges an array of potentially overlapping DayIntervals into a minimal set
 * of non-overlapping intervals, then returns the total number of calendar days
 * covered.
 *
 * Algorithm:
 * 1. Sort intervals by start ascending.
 * 2. Walk through, merging any interval that overlaps or is contiguous with
 *    the current running interval.
 * 3. Sum the durations of the resulting merged intervals.
 */
function totalMergedTollingDays(intervals: DayInterval[]): number {
  if (intervals.length === 0) return 0;

  // Sort by start ascending
  const sorted = [...intervals].sort((a, b) => a.start - b.start);

  const merged: DayInterval[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      // Overlapping or contiguous — extend the running interval
      last.end = Math.max(last.end, current.end);
    } else {
      merged.push(current);
    }
  }

  // Convert merged intervals into total calendar days
  let totalDays = 0;
  for (const interval of merged) {
    const start = new Date(interval.start);
    const end = new Date(interval.end);
    totalDays += differenceInCalendarDays(end, start);
  }

  return totalDays;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Calculates the adjusted CSED for every tax debt, accounting for tolling
 * events (and their associated grace periods) while de-duplicating any
 * overlapping tolling intervals.
 *
 * @param taxDebts      - Array of tax debts from the taxpayer's account.
 * @param tollingEvents - Map of debt ID → array of tolling events.
 * @returns CSEDResult[] sorted by adjustedCSED ascending (earliest expiring first).
 *
 * @remarks
 * IRS basis: IRC § 6502(a)(1), IRM 5.1.19
 */
export function calculateCSED(
  taxDebts: TaxDebt[],
  tollingEvents: Record<string, TollingEvent[]>,
): CSEDResult[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const results: CSEDResult[] = taxDebts.map((debt) => {
    // 1. Parse assessment date
    const assessmentDate = parseISO(debt.assessmentDate);

    // 2. Base CSED = assessment date + 3 650 days (10 years)
    const baseCSED = addDays(assessmentDate, CSED_STATUTE_DAYS);

    // 3. Gather tolling events for this debt
    const events = tollingEvents[debt.id] ?? [];

    // 4-5. Convert to intervals, merge overlaps, sum total tolling days
    const intervals = events.map((e) => eventToInterval(e, today));
    const totalTollingDays = totalMergedTollingDays(intervals);

    // 6. Adjusted CSED = base CSED + total tolling days
    const adjustedCSED = addDays(baseCSED, totalTollingDays);

    // 7. Remaining months (floored at 0)
    const remainingMonths = Math.max(
      0,
      differenceInMonths(adjustedCSED, today),
    );

    // 8. Expiration check
    const isExpired =
      isBefore(adjustedCSED, today) || isEqual(adjustedCSED, today);

    return {
      taxDebtId: debt.id,
      taxYear: debt.taxYear,
      baseCSED: baseCSED.toISOString().split('T')[0],
      adjustedCSED: adjustedCSED.toISOString().split('T')[0],
      totalTollingDays,
      remainingMonths,
      isExpired,
    };
  });

  // Sort by adjusted CSED ascending (earliest expiring first)
  results.sort((a, b) => a.adjustedCSED.localeCompare(b.adjustedCSED));

  return results;
}

/**
 * Convenience helper: given a CSED date string (ISO format), returns the
 * number of whole months remaining until that date from today.
 *
 * Returns 0 if the CSED has already passed.
 */
export function calculateRemainingMonths(csedDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const csed = parseISO(csedDate);

  return Math.max(0, differenceInMonths(csed, today));
}
