export default function RecurringPreview({ dates }: { dates: string[] }) {
    return (
      <div className="mt-4 bg-gray-100 p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Recurring Dates:</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {dates.map((date, idx) => (
            <li key={idx}>{date}</li>
          ))}
        </ul>
      </div>
    );
  }
  