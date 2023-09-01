import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import expensesStyles from '~/styles/expenses.css';
import Chart from '~/components/expenses/Chart';

const DUMMY_EXPENSES = [
	{
		id: 'e1',
		title: 'First Expense',
		amount: 12.99,
		date: new Date().toISOString(),
	},
	{
		id: 'e2',
		title: 'Second Expense',
		amount: 15.49,
		date: new Date().toISOString(),
	},
	{
		id: 'e3',
		title: 'Third Expense',
		amount: 42.99,
		date: new Date().toISOString(),
	},
];

export default function ExpenseAnalysisPage() {
	return (
		<main>
			<Chart expenses={DUMMY_EXPENSES} />
			<ExpenseStatistics expenses={DUMMY_EXPENSES} />
		</main>
	);
}

export function links() {
	return [{ rel: 'stylesheet', href: expensesStyles }];
}
