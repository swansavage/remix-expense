import { prisma } from './database.server';
import { hash } from 'bcryptjs';

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

	await prisma.user.create({ data: { email: email, password: passwordHash } });
}
