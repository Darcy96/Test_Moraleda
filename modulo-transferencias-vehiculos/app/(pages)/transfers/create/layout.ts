

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Crear Transferencia',
	description: 'Página de transferencias'
}

export default function Layout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}

