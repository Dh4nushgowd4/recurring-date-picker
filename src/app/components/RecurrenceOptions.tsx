'use client';

import React from 'react';

interface RecurrenceOptionsProps {
  value: 'daily' | 'weekly' | 'monthly' | 'yearly';
  onChange: (value: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
}

export default function RecurrenceOptions({ value, onChange }: RecurrenceOptionsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="frequency" className="font-medium text-gray-700">
        Repeat Frequency:
      </label>
      <select
        id="frequency"
        value={value}
        onChange={(e) => onChange(e.target.value as RecurrenceOptionsProps['value'])}
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
