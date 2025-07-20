'use client';

import { useState } from 'react';
import { getRecurringDates } from '@/utils/getRecurringDates';
import RecurringPreview from './RecurringPreview';

export default function RecurringForm() {
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  const [interval, setInterval] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [occurrences, setOccurrences] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleCheckbox = (dayIndex: number) => {
    setSelectedDays((prev) =>
      prev.includes(dayIndex) ? prev.filter((d) => d !== dayIndex) : [...prev, dayIndex]
    );
  };

  const handleGenerate = () => {
    setError('');
    const maxOccurrences = occurrences ? parseInt(occurrences) : undefined;

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

      <div>
        <label className="block font-medium">Frequency</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as any)}
          className="border px-2 py-1 rounded w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

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

      <div>
        <label className="block font-medium">Repeat Every</label>
        <input
          type="number"
          value={interval}
          min={1}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-medium">End Date (optional)</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Or End After N Occurrences</label>
        <input
          type="number"
          value={occurrences}
          min={1}
          onChange={(e) => setOccurrences(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleGenerate}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Generate Preview
      </button>

      {dates.length > 0 && <RecurringPreview dates={dates} />}
    </div>
  );
}
