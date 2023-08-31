import { Outlet } from '@remix-run/react';

export default function ExpensesLayout() {
	return (
		<div>
			<h1>Expenses Layout</h1>
			<p>some shared elements</p>
			<Outlet />
		</div>
	);
}
