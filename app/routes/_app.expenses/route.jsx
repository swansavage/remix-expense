import { Link, Outlet } from '@remix-run/react';
import { json } from '@remix-run/node';
import { getExpenses } from '~/data/expenses.server';
import ExpensesList from '~/components/expenses/ExpensesList';
import { FaDownload, FaPlus } from 'react-icons/fa';
import { useLoaderData } from '@remix-run/react';

export default function ExpensesLayout() {
	let data = useLoaderData();

	const hasExpenses = data && data.length > 0;

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
				{hasExpenses && <ExpensesList expenses={data} />}
				{!hasExpenses && (
					<section id="no-expenses">
						<h1>No expenses found</h1>
						<p>
							Start <Link to="add"> adding some</Link> today.
						</p>
					</section>
				)}
			</main>
		</>
	);
}

export async function loader() {
	const expenses = await getExpenses();

	return expenses;
}
