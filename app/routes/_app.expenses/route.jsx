import { Link, Outlet } from '@remix-run/react';

import ExpensesList from '~/components/expenses/ExpensesList';
import ExpensesHeader from '../../components/navigation/ExpenseHeader';
import { FaDownload, FaPlus } from 'react-icons/fa';

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
				<section id="expenses-actions">
					<Link to="add">
						<FaPlus />
						<span>Add Expense</span>
					</Link>
					<a href="/expenses/raw">
						<FaDownload></FaDownload>
						<span>Load Raw Data</span>
					</a>
				</section>
				<ExpensesList expenses={DUMMY_EXPENSES} />
			</main>
		</>
	);
}
