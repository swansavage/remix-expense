import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import expensesStyles from '~/styles/expenses.css';
import Chart from '~/components/expenses/Chart';
import { getExpenses } from '../../data/expenses.server';
import { json } from '@remix-run/node';
import {
	useLoaderData,
	isRouteErrorResponse,
	useRouteError,
} from '@remix-run/react';
import Error from '../../components/util/Error';

export default function ExpenseAnalysisPage() {
	const expenses = useLoaderData();

	return (
		<main>
			<Chart expenses={expenses} />
			<ExpenseStatistics expenses={expenses} />
		</main>
	);
}

export async function loader() {
	const expenses = await getExpenses();

	if (!expenses || expenses.length === 0) {
		throw json(
			{ message: 'Could not load expenses for the requested analysis.' },
			{ status: 404, statusText: 'Expenses not found' }
		);
	}

	return expenses;
}

export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<main>
				<Error title={error.statusText}>
					<p>
						{error.data?.message ||
							'Somethin went wrong - could not load expenses.'}
					</p>
				</Error>
			</main>
		);
	}
}

export function links() {
	return [{ rel: 'stylesheet', href: expensesStyles }];
}
