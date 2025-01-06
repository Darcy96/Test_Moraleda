

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Login',
	description: 'Página de login'
}

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}

