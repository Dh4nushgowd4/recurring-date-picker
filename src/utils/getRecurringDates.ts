// src/utils/getRecurringDates.ts

export function getRecurringDates(
    start: string,
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly',
    interval: number,
    endDate?: string,
    maxOccurrences?: number,
    selectedDays: number[] = []
  ): string[] {
    const result: string[] = [];
    let current = new Date(start);
    const end = endDate ? new Date(endDate) : undefined;
    let count = 0;
  
    while (
      (!end || current <= end) &&
      (!maxOccurrences || count < maxOccurrences)
    ) {
      if (frequency === 'weekly') {
        if (selectedDays.includes(current.getDay())) {
          result.push(current.toISOString().split('T')[0]);
          count++;
        }
        current.setDate(current.getDate() + 1);
      } else {
        result.push(current.toISOString().split('T')[0]);
        count++;
  
        if (frequency === 'daily') {
          current.setDate(current.getDate() + interval);
        } else if (frequency === 'monthly') {
          current.setMonth(current.getMonth() + interval);
        } else if (frequency === 'yearly') {
          current.setFullYear(current.getFullYear() + interval);
        }
      }
    }
  
    return result;
  }
  