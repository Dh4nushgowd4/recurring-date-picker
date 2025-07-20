export interface RecurringDatesParams {
  start: Date;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  maxOccurrences?: number;
  selectedDays?: number[]; // Used only for 'weekly'
}

export function getRecurringDates({
  start,
  frequency,
  interval,
  endDate,
  maxOccurrences = 100,
  selectedDays = [],
}: RecurringDatesParams): string[] {
  const dates: string[] = [];
  let current = new Date(start);
  let count = 0;

  while ((!endDate || current <= endDate) && count < maxOccurrences) {
    const day = current.getDay();

    const isValid =
      frequency === 'daily' ||
      (frequency === 'weekly' && selectedDays.includes(day)) ||
      (frequency === 'monthly' && current.getDate() === start.getDate()) ||
      (frequency === 'yearly' &&
        current.getDate() === start.getDate() &&
        current.getMonth() === start.getMonth());

    if (isValid) {
      dates.push(current.toISOString().split('T')[0]);
      count++;
    }

    if (frequency === 'daily') {
      current.setDate(current.getDate() + interval);
    } else if (frequency === 'weekly') {
      current.setDate(current.getDate() + 1);
    } else if (frequency === 'monthly') {
      current.setMonth(current.getMonth() + interval);
    } else if (frequency === 'yearly') {
      current.setFullYear(current.getFullYear() + interval);
    }

    if (endDate && current > endDate) break;
  }

  return dates;
}
