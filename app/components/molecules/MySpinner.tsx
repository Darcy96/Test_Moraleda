'use client'
import React from 'react'
import { CircularProgress, Typography } from '@mui/material'

interface Props {
	message: string
}
export default function MySpinner({ message }: Props) {
	return (
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
			<CircularProgress />
			<Typography>{message}</Typography>
		</div>
	)
}
