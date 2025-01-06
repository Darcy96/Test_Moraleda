'use client'
import { useTransfers } from '@api/transfers/hooks'
import MySpinner from '@components/molecules/MySpinner'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Transferencia } from 'app/types'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import Filter from './Filter'

export default function TransferTable() {
	const router = useRouter() // 🧭 Accessing the Next.js router
	const { data: transfers, isLoading, isError, error } = useTransfers() // 🎣 Fetching transfers data using a custom hook
	const [spinnerMessage, setSpinnerMessage] = useState<string>('Loading transfers') // 💬 State for managing spinner message
	const [headers, setHeaders] = useState<false | (keyof Transferencia)[]>() // 🗃️ State for storing table headers

	// 🗃️ State for managing filter values
	const [filters, setFilters] = useState({ plate: '', type: '' })

	// 🔄 Filtering transfers based on filter values using useMemo for optimization
	const filteredTransfers = useMemo(() => {
		if (!transfers) return []
		const plateFilter = filters.plate.toLowerCase()
		return transfers.filter((t) => t.plate.toLowerCase().includes(plateFilter) && (filters.type === '' || t.type === filters.type))
	}, [transfers, filters])

	// 🔄 useEffect hook to manage spinner message and table headers
	useEffect(() => {
		if (isLoading) {
			setSpinnerMessage('Loading transfers') // 💬 Setting spinner message while loading
		}
		if (isError) {
			setSpinnerMessage(`Error: ${error.message}`) // 💬 Setting error message if fetching fails
		}
		if (filteredTransfers.length === 0 || transfers?.length === 0) {
			setSpinnerMessage('No transfers available') // 💬 Setting message if no transfers are found
		} else {
			if (headers === undefined) {
				setHeaders(() => Object.keys(filteredTransfers[0]) as (keyof Transferencia)[]) // 🗃️ Setting table headers from the first transfer object
			}
		}
		setSpinnerMessage('') // 💬 Clearing spinner message when data is available
	}, [isLoading, isError, filteredTransfers, headers])

	// 🚀 Handling row clicks to navigate to the edit page for the selected transfer
	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		router.push(`/transfers/edit/${id}`) // 🧭 Navigating to the edit page with the transfer ID
	}
	return (
		<Box>
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
