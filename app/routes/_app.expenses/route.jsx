import { Link, Outlet } from '@remix-run/react';
import { getExpenses } from '~/data/expenses.server';
import ExpensesList from '~/components/expenses/ExpensesList';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { useLoaderData } from '@remix-run/react';

export default function ExpensesLayout() {
	let data = useLoaderData();

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
				<ExpensesList expenses={data} />
			</main>
		</>
	);
}

export async function loader() {
	return getExpenses();
}
