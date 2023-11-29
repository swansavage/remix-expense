import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { useNavigate, useLoaderData } from '@remix-run/react';
import { updateExpense, deleteExpense } from '~/data/expenses.server';
import { redirect } from '@remix-run/node';
import { validateExpenseInput } from '~/data/validation.server';

export default function ExpenseDetailPage() {
	const navigate = useNavigate();

	function closeHandler() {
		navigate('..');
	}
	return (
		<Modal onClose={closeHandler}>
			<ExpenseForm />
		</Modal>
	);
}

export async function action({ params, request }) {
	const expenseId = params.id;

	if (request.method === 'PATCH') {
		const formData = await request.formData();
		const expenseData = Object.fromEntries(formData);
		console.log(expenseData);
		try {
			validateExpenseInput(expenseData);
		} catch (error) {
			return error;
		}

		await updateExpense(expenseId, expenseData);
		return redirect('/expenses');
	} else if (request.method === 'DELETE') {
		await deleteExpense(expenseId);
		return { deletedId: expenseId };
	}
}
