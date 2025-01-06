import React from 'react'

import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'

import { transferTypes } from '@constants/general'
import { Transferencia } from 'app/types'

interface Props {
	transfers: Transferencia[] | undefined
	filters: {
		plate: string
		type: string
	}
	setFilters: React.Dispatch<
		React.SetStateAction<{
			plate: string
			type: string
		}>
	>
}

export default function Filter({ filters, setFilters }: Props) {
	const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFilters((prev) => ({ ...prev, [name]: value }))
	}

	const handleSelectChange = (e: SelectChangeEvent<string>) => {
		const { name, value } = e.target
		setFilters((prev) => ({ ...prev, [name!]: value }))
	}

	return (
		<Paper
			sx={{
				padding: '10px',
				display: 'flex',
				gap: '8px',
				marginBottom: '16px',
				alignItems: 'center',
				borderRadius: '8px',
				boxShadow: 'inherit',
				color: 'rgb(230, 235, 241)',
				border: '1px solid'
			}}
		>
			<Typography
				color="textPrimary"
				variant="h6"
			>
				Filter
			</Typography>
			<TextField
				label="Plate"
				name="plate"
				value={filters.plate}
				onChange={handleTextFieldChange}
				variant="outlined"
				size="small"
			/>
			<FormControl
				size="small"
				sx={{ minWidth: 150 }}
			>
				<InputLabel id="type-label">Type</InputLabel>
				<Select
					labelId="type-label"
					name="type"
					label="Type"
					value={filters.type}
					onChange={handleSelectChange}
				>
					<MenuItem value="">Todos</MenuItem>
					{transferTypes.map((type) => (
						<MenuItem
							key={type}
							value={type}
						>
							{type}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Paper>
	)
}
