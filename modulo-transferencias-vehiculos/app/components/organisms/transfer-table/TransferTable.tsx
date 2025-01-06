'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Box,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTransfers } from '@api/transfers/hooks'
import { Transferencia } from 'app/types'
import Filter from './Filter'
import { useRouter } from 'next/navigation'
import MySpinner from '@components/molecules/MySpinner'

export default function TransferTable() {
	const router = useRouter()
	const { data: transfers, isLoading, isError, error } = useTransfers()
	const [spinnerMessage, setSpinnerMessage] = useState<string>('Loading transfers')
	const [headers, setHeaders] = useState<false | (keyof Transferencia)[]>()

	const [filters, setFilters] = useState({ plate: '', type: '' })

	const filteredTransfers = useMemo(() => {
		if (!transfers) return []
		const plateFilter = filters.plate.toLowerCase()
		return transfers.filter((t) => t.plate.toLowerCase().includes(plateFilter) && (filters.type === '' || t.type === filters.type))
	}, [transfers, filters])

	useEffect(() => {
		if (isLoading) {
			setSpinnerMessage('Loading transfers')
		}
		if (isError) {
			setSpinnerMessage(`Error: ${error.message}`)
		}
		if (filteredTransfers.length === 0 || transfers?.length === 0) {
			setSpinnerMessage('No transfers available')
		} else {
			if (headers === undefined) {
				setHeaders(() => Object.keys(filteredTransfers[0]) as (keyof Transferencia)[])
			}
		}
		setSpinnerMessage('')
	}, [isLoading, isError, filteredTransfers, headers])

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		router.push(`/transfers/edit/${id}`)
	}

	return (
		<Box>
			{/* Filtros */}
			<Filter
				filters={filters}
				setFilters={setFilters}
				transfers={transfers}
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
													{header.replace(/_/g, ' ')}
												</Typography>
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{filteredTransfers.map((transferencia) => (
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
