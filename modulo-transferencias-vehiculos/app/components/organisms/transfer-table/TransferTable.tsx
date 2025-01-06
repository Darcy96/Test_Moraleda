'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Box, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTransferencias } from '@api/transfers/hooks'
import { Transferencia } from 'app/types'
import Filter from './Filter'
import { useRouter } from 'next/navigation'
import MySpinner from '@components/molecules/MySpinner'

export default function TransferTable() {
	const router = useRouter()
	const { data: transferencias, isLoading, isError, error } = useTransferencias()
	const [spinnerMessage, setSpinnerMessage] = useState<string>('Loading transfers')
	const [headers, setHeaders] = useState<false | (keyof Transferencia)[]>()

	const [filters, setFilters] = useState({ plate: '', type: '' })

	const filteredTransferencias = useMemo(() => {
		if (!transferencias) return []
		const plateFilter = filters.plate.toLowerCase()
		return transferencias.filter((t) => t.plate.toLowerCase().includes(plateFilter) && (filters.type === '' || t.type === filters.type))
	}, [transferencias, filters])

	useEffect(() => {
		if (isLoading) {
			setSpinnerMessage('Loading transfers')
		}
		if (isError) {
			setSpinnerMessage(`Error: ${error.message}`)
		}
		if (filteredTransferencias.length === 0 || transferencias?.length === 0) {
			setSpinnerMessage('No transfers available')
		} else {
			if (headers === undefined) {
				setHeaders((prev) => Object.keys(filteredTransferencias[0]) as (keyof Transferencia)[])
			}
		}
		setSpinnerMessage('')
	}, [isLoading, isError, filteredTransferencias, headers])

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		router.push(`/transfers/edit/${id}`)
	}

	return (
		<Box>
			{/* Filtros */}
			<Filter
				filters={filters}
				setFilters={setFilters}
				transferencias={transferencias}
			/>
			{spinnerMessage !== '' ? (
				<MySpinner message={spinnerMessage} />
			) : (
				<Paper sx={{ borderRadius: '8px', boxShadow: 'inherit', color: 'rgb(230, 235, 241)', border: '1px solid' }}>
					{headers && (
						<TableContainer sx={{ maxHeight: '80vh', borderRadius: '8px' }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										{headers.map((header) => (
											<TableCell key={header}>
												<Typography
													textTransform={'capitalize'}
													variant="subtitle1"
													fontWeight={600}
												>
													{header}
												</Typography>
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredTransferencias.map((transferencia) => (
										<TableRow
											sx={{ cursor: 'pointer' }}
											hover
											key={transferencia.id}
											onClick={(event) => handleClick(event, transferencia.id)}
										>
											{headers.map((header) => (
												<TableCell key={header}>
													{header === 'created_at' ? new Date(transferencia[header] as string).toLocaleString() : transferencia[header]}
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Paper>
			)}
		</Box>
	)
}
