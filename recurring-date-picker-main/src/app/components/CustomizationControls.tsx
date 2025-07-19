'use client';

import React from 'react';

interface CustomizationControlsProps {
  unit: 'day' | 'week' | 'month' | 'year';
  value: number;
  onChange: (value: number) => void;
}

export default function CustomizationControls({ unit, value, onChange }: CustomizationControlsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="interval" className="font-medium text-gray-700">
        Repeat every:
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          id="interval"
          min={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="border rounded px-3 py-2 w-24"
        />
        <span className="text-gray-700">{unit}(s)</span>
      </div>
    </div>
  );
}
