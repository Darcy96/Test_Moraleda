

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create',
	description: 'Create transfer'
}

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}

