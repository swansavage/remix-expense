import ExpensesHeader from '../../components/navigation/ExpenseHeader';
import expensesStyles from '~/styles/expenses.css';
import { Outlet } from '@remix-run/react';

export default function ExpensesLayout() {
	return (
		<>
			<ExpensesHeader />
			<Outlet />
		</>
	);
}

export function links() {
	return [{ rel: 'stylesheet', href: expensesStyles }];
}
