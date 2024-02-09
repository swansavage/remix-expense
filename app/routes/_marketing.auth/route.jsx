import authStyles from '~/styles/auth.css';
import AuthForm from '~/components/auth/AuthForm';
import { validateCredentials } from '../../data/validation.server';
import { signup } from '../../data/auth.server';
import { redirect } from '@remix-run/node';

export default function AuthPage() {
	return <AuthForm />;
}

export async function action({ request }) {
	const searchParams = new URL(request.url).searchParams;
	const authMode = searchParams.get('mode') || 'login';
	const formData = await request.formData();
	const credentials = Object.fromEntries(formData);

	// validate user input
	try {
		validateCredentials(credentials);
	} catch (error) {
		return error;
	}

	try {
		if (authMode === 'login') {
			// login logic
		} else {
			await signup(credentials);
			return redirect('/expenses');
		}
	} catch (error) {
		console.log('caught error', error);
		console.log(error);
		if (error.status === 422) {
			return { credentials: error.statusText };
		}
	}
}

export function links() {
	return [{ rel: 'stylesheet', href: authStyles }];
}
