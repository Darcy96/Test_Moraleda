

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Edit transfer',
	description: 'Edit transfer page'
}

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}

