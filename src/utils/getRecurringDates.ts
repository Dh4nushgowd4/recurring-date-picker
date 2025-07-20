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
  const current = new Date(start);
  let count = 0;

  if (frequency === 'weekly' && selectedDays.length === 0) {
    return [];
  }

  while (count < maxOccurrences) {
    const currentCopy = new Date(current); // avoid mutation issues
    const day = current.getDay();

    let isValid = false;

    if (frequency === 'daily') {
      isValid = true;
    } else if (frequency === 'weekly') {
      isValid = selectedDays.includes(day);
    } else if (frequency === 'monthly') {
      isValid = current.getDate() === start.getDate();
    } else if (frequency === 'yearly') {
      isValid = current.getDate() === start.getDate() && current.getMonth() === start.getMonth();
    }

    if (isValid) {
      if (!endDate || current <= endDate) {
        dates.push(current.toISOString().split('T')[0]);
        count++;
      } else {
        break;
      }
    }

    if (frequency === 'daily') {
      current.setDate(current.getDate() + interval);
    } else if (frequency === 'weekly') {
      current.setDate(current.getDate() + 1); // Daily step, but only add if matched
      // If we’ve looped a full week, advance by (interval - 1) weeks
      if (selectedDays.includes(current.getDay()) && current > currentCopy) {
        const diffDays = 7 * (interval - 1);
        current.setDate(current.getDate() + diffDays);
      }
    } else if (frequency === 'monthly') {
      current.setMonth(current.getMonth() + interval);
    } else if (frequency === 'yearly') {
      current.setFullYear(current.getFullYear() + interval);
    }

    if (endDate && current > endDate) break;
  }

  return dates;
}
