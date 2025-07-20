'use client';

import { useState } from 'react';
import { getRecurringDates } from '@/utils/getRecurringDates';
import RecurringPreview from './RecurringPreview';

export default function RecurringForm() {
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [interval, setInterval] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [occurrences, setOccurrences] = useState<string>('');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleCheckbox = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  const handleGenerate = () => {
    setError('');
    const maxOccurrences = occurrences ? parseInt(occurrences, 10) : undefined;

    if (!startDate || (!endDate && !maxOccurrences)) {
      setError('Start Date and either End Date or Occurrences are required.');
      return;
    }

    if (frequency === 'weekly' && selectedDays.length === 0) {
      setError('Select at least one weekday for weekly recurrence.');
      return;
    }

    const result = getRecurringDates({
      start: new Date(startDate),
      frequency,
      interval,
      endDate: endDate ? new Date(endDate) : undefined,
      maxOccurrences,
      selectedDays,
    });

    setDates(result);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-semibold">Recurring Date Generator</h2>

      {/* Frequency Selector */}
      <div>
        <label className="block font-medium">Frequency</label>
        <select
          value={frequency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly')
          }
          className="border px-2 py-1 rounded w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Weekly Day Selection */}
      {frequency === 'weekly' && (
        <div>
          <label className="block font-medium mb-1">Repeat on</label>
          <div className="flex flex-wrap gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <label key={day} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={selectedDays.includes(i)}
                  onChange={() => handleCheckbox(i)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Interval Input */}
      <div>
        <label className="block font-medium">Repeat Every</label>
        <input
          type="number"
          value={interval}
          min={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInterval(Number(e.target.value))
          }
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {/* Start Date */}
      <div>
        <label className="block font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block font-medium">End Date (optional)</label>
        <input
          type="date"
          value={endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {/* Occurrences */}
      <div>
        <label className="block font-medium">Or End After N Occurrences</label>
        <input
          type="number"
          value={occurrences}
          min={1}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOccurrences(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <button
        onClick={handleGenerate}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate Preview
      </button>

      {/* Output Preview */}
      {dates.length > 0 && <RecurringPreview dates={dates} />}
    </div>
  );
}
