import RecurringForm from './components/RecurringForm';

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Enhanced Recurring Date Picker</h1>
      <RecurringForm />
    </main>
  );
}
