import { $Enums, type Budget as PrismaBudget } from '@expensy-track/prisma';
import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns';
import type { DateTimeRange } from '../../../@types/graphql-generated.js';

type ReturnType = {
  remainingSpan: number;
  dateTimeRange: DateTimeRange;
};

export function getBudgetCurrentSnapshotDateTimeRange(budget: PrismaBudget): ReturnType {
  const now = new Date();

  switch (budget.span) {
    case $Enums.BudgetSpan.DAILY:
      return {
        remainingSpan: differenceInHours(endOfDay(now), now),
        dateTimeRange: {
          endTime: endOfDay(now),
          startTime: startOfDay(now)
        }
      };

    case $Enums.BudgetSpan.WEEKLY:
      return {
        remainingSpan: differenceInDays(endOfWeek(now), now),
        dateTimeRange: {
          endTime: endOfWeek(now),
          startTime: startOfWeek(now)
        }
      };

    case $Enums.BudgetSpan.MONTHLY:
      return {
        remainingSpan: differenceInDays(endOfMonth(now), now),
        dateTimeRange: {
          endTime: endOfMonth(now),
          startTime: startOfMonth(now)
        }
      };

    case $Enums.BudgetSpan.ANNUAL:
      return {
        remainingSpan: differenceInMonths(endOfYear(now), now),
        dateTimeRange: {
          endTime: endOfYear(now),
          startTime: startOfYear(now)
        }
      };
  }
}
