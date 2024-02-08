import { cssBundleHref } from '@remix-run/css-bundle';
import sharedStyles from '~/styles/shared.css';
import Error from './components/util/Error';
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
	isRouteErrorResponse,
} from '@remix-run/react';

export const links = () => [
	...(cssBundleHref
		? [{ rel: 'stylesheet', href: cssBundleHref }]
		: [{ rel: 'stylesheet', href: sharedStyles }]),
];

function Document({ title, children }) {
	return (
		<html lang="en">
			<head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<Meta />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
					rel="stylesheet"
				/>
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	console.log('hit!');
	const error = useRouteError();
	console.log(error);
	if (isRouteErrorResponse(error)) {
		console.log(error);
		return (
			<Document title={error.statusText}>
				<main>
					<Error title={error.statusText}>
						<p>
							{error.data?.message ||
								'Something went wrong, please try again later!'}
						</p>
						<p>
							Back to <Link to="/">safety</Link>.
						</p>
					</Error>
				</main>
			</Document>
		);
	}
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}
