// src/app/components/MiniCalendarPreview.tsx

'use client';

import React from 'react';
import { eachDayOfInterval, format, isSameDay, isBefore, addDays } from 'date-fns';

interface MiniCalendarPreviewProps {
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly'; // must match!
  interval: number;
  selectedDays: number[];
  pattern: string;
  startDate: string;
  endDate: string;
}


export default function MiniCalendarPreview({
  startDate,
  endDate,
  interval,
  selectedDays,
}: MiniCalendarPreviewProps) {
  if (!startDate || selectedDays.length === 0) return null;

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : addDays(start, 60); // default to 2 months if no end date

  const allDates = eachDayOfInterval({ start, end });

  // Filter dates that match selected weekdays and interval
  const recurringDates = allDates.filter((date, index) => {
    const weekday = date.getDay();
    const weeksPassed = Math.floor((date.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    return selectedDays.includes(weekday) && weeksPassed % interval === 0;
  });

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">Recurring Dates Preview:</h3>
      <ul className="text-sm list-disc pl-5 text-gray-700">
        {recurringDates.map((date) => (
          <li key={date.toISOString()}>{format(date, 'eeee, MMM d yyyy')}</li>
        ))}
      </ul>
    </div>
  );
}
