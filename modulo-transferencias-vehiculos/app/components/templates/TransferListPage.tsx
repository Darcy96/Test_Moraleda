'use client'
import React from 'react'
import { Typography, Box, Button } from '@mui/material'

import { useRouter } from 'next/navigation'
import { TransferTable } from '@components/organisms'
import { usePermissions } from 'app/hooks/usePermissions'

export default function TransferListPage() {
	const { hasPermission } = usePermissions()
	const router = useRouter()
	const handleAddTransferencia = () => {
		router.push('/transfers/create')
	}

	return (
		<Box>
			{/* Encabezado */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '20px'
				}}
			>
				<Typography
					variant="h4"
					gutterBottom
				>
					Transfers
				</Typography>
				{hasPermission('create') && (
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddTransferencia}
					>
						Add transfer
					</Button>
				)}
			</Box>

			{/* Tabla de Transferencias */}
			<TransferTable />
		</Box>
	)
}
