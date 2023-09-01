import { Outlet } from '@remix-run/react';
import expensesStyles from '~/styles/expenses.css';
import ExpensesList from '~/components/expenses/ExpensesList';

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

export default function ExpensesLayout() {
	return (
		<>
			<Outlet />
			<main>
				<ExpensesList expenses={DUMMY_EXPENSES} />
			</main>
		</>
	);
}

export function links() {
	return [{ rel: 'stylesheet', href: expensesStyles }];
}
