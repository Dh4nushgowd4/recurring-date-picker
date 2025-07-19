'use client';

import { useState } from 'react';
import { getRecurringDates } from '@/utils/getRecurringDates';
import RecurringPreview from './RecurringPreview';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function RecurringForm() {
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
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

    const result = getRecurringDates(
      startDate,
      frequency,
      interval,
      endDate || undefined,
      maxOccurrences,
      selectedDays
    );

    setDates(result);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Repeat Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {frequency === 'weekly' && (
          <div>
            <label className="block font-medium mb-1">Repeat on:</label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map((day, i) => (
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
          <label className="block font-medium">
            Repeat every
            <input
              type="number"
              value={interval}
              min={1}
              onChange={(e) => setInterval(Number(e.target.value))}
              className="border px-2 py-1 rounded mx-2 w-20"
            />
            {frequency === 'daily' ? 'day(s)' : 'week(s)'}
          </label>
        </div>

        <div>
          <label className="block font-medium">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">End Date (optional):</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Or End After N Occurrences:</label>
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
      </div>

      {dates.length > 0 && (
        <>
          <div className="mt-4 text-sm text-gray-700">
            <p>
              <strong>Preview:</strong> {frequency} every {interval}{' '}
              {frequency === 'daily' ? 'day(s)' : 'week(s)'}
            </p>
            <p>
              <strong>Start:</strong> {startDate}
            </p>
            {endDate && <p><strong>End:</strong> {endDate}</p>}
            {occurrences && <p><strong>Occurrences:</strong> {occurrences}</p>}
          </div>

          <RecurringPreview dates={dates} />
        </>
      )}
    </div>
  );
}
