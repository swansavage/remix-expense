import { prisma } from './database.server';
import { hash, compare } from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
	cookie: {
		secure: process.env.NODE_ENV === 'production',
		secrets: [SESSION_SECRET],
		sameSite: 'lax',
		maxAge: 30 * 24 * 60 * 60, // 30 days
		httpOnly: true,
	},
});

async function createUserSession(userId, redirectPath) {
	const session = await sessionStorage.getSession();
	session.set('userId', userId);
	return redirect(redirectPath, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	});
}

export async function getUserFromSession(request) {
	const session = await sessionStorage.getSession(
		request.headers.get('Cookie')
	);

	const userId = session.get('userId');

	if (!userId) {
		return null;
	}

	return userId;
}

export async function destroyUserSession(request) {
	const session = await sessionStorage.getSession(
		request.headers.get('Cookie')
	);

	return redirect('/', {
		headers: {
			'Set-Cookie': await sessionStorage.destroySession(session),
		},
	});
}

export async function signup({ email, password }) {
	const existingUser = await prisma.user.findFirst({ where: { email } });

	if (existingUser) {
		throw new Response(
			'A user with the provided email address exists already.',
			{
				status: 422,
				statusText: 'A user with the provided email address exists already.',
			}
		);
	}

	const passwordHash = await hash(password, 12);

	const user = await prisma.user.create({
		data: { email: email, password: passwordHash },
	});

	return createUserSession(user.id, '/expenses');
}

export async function login({ email, password }) {
	const existingUser = await prisma.user.findFirst({ where: { email } });

	if (!existingUser) {
		console.log('not existing user');
		throw new Response(
			'Could not log you in, please check the provided credentials.',
			{
				status: 401,
				statusText:
					'Could not log you in, please check the provided credentials.',
			}
		);
	}

	const passwordCorrect = await compare(password, existingUser.password);

	if (!passwordCorrect) {
		console.log('wrong password');
		throw new Response(
			'Could not log you in, please check the provided credentials.',
			{
				status: 401,
				statusText:
					'Could not log you in, please check the provided credentials.',
			}
		);
	}

	return createUserSession(existingUser.id, '/expenses');
}
