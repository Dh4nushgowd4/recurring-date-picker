'use client';

import React, { useState } from 'react';

type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';
type CustomizationUnit = 'day' | 'week' | 'month' | 'year';

function RecurrenceOptions({
  value,
  onChange,
}: {
  value: RecurrenceType;
  onChange: (value: RecurrenceType) => void;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="frequency" className="font-medium text-gray-700">
        Repeat Frequency:
      </label>
      <select
        id="frequency"
        value={value}
        onChange={(e) => onChange(e.target.value as RecurrenceType)}
        className="border rounded px-3 py-2 w-full max-w-xs"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}

// Dummy stubs for other components (replace with real ones as needed)
function CustomizationControls({
  unit,
  value,
  onChange,
}: {
  unit: CustomizationUnit;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div className="flex space-x-2">
      <label className="font-medium text-gray-700">Repeat every</label>
      <input
        type="number"
        min={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded px-3 py-1 w-16"
      />
      <span>{unit + (value > 1 ? 's' : '')}</span>
    </div>
  );
}

function DaySelector({
  selectedDays,
  onChange,
}: {
  selectedDays: number[];
  onChange: (days: number[]) => void;
}) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const toggle = (index: number) => {
    if (selectedDays.includes(index)) {
      onChange(selectedDays.filter((d) => d !== index));
    } else {
      onChange([...selectedDays, index]);
    }
  };
  return (
    <div className="flex space-x-2">
      {days.map((day, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className={`px-2 py-1 rounded ${
            selectedDays.includes(i) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

function PatternSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="font-medium text-gray-700">Monthly Pattern:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-3 py-2 w-full max-w-xs mt-1"
      >
        <option value="first-monday">First Monday</option>
        <option value="second-tuesday">Second Tuesday</option>
        <option value="last-friday">Last Friday</option>
      </select>
    </div>
  );
}

function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChange(e.target.value, endDate)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChange(startDate, e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />
      </div>
    </div>
  );
}

function CalendarPreview({
  recurrenceType,
  interval,
  selectedDays,
  pattern,
  startDate,
  endDate,
}: {
  recurrenceType: RecurrenceType;
  interval: number;
  selectedDays: number[];
  pattern: string;
  startDate: string;
  endDate: string;
}) {
  return (
    <div className="border rounded p-4 bg-gray-100">
      <p>
        <strong>Preview:</strong> {recurrenceType} every {interval}x
      </p>
      <p>Start: {startDate || 'N/A'}</p>
      <p>End: {endDate || 'N/A'}</p>
    </div>
  );
}

function RecurringDatePicker() {
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>('weekly');
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [monthlyPattern, setMonthlyPattern] = useState<string>('second-tuesday');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const convertToUnit = (type: RecurrenceType): CustomizationUnit => {
    switch (type) {
      case 'daily':
        return 'day';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
      case 'yearly':
        return 'year';
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold">Recurring Date Picker</h1>

      <RecurrenceOptions value={recurrenceType} onChange={setRecurrenceType} />

      <CustomizationControls
        unit={convertToUnit(recurrenceType)}
        value={interval}
        onChange={setInterval}
      />

      {recurrenceType === 'weekly' && (
        <DaySelector selectedDays={selectedDays} onChange={setSelectedDays} />
      )}

      {recurrenceType === 'monthly' && (
        <PatternSelector value={monthlyPattern} onChange={setMonthlyPattern} />
      )}

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />

      <CalendarPreview
        recurrenceType={recurrenceType}
        interval={interval}
        selectedDays={selectedDays}
        pattern={monthlyPattern}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="p-8">
      <RecurringDatePicker />
    </main>
  );
}
