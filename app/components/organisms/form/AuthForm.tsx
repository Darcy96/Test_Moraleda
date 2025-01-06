'use client'

import React, { useState } from 'react'
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material'

import { ErrorOutline } from '@mui/icons-material'
import { useAuth } from '@context/AuthContext'

export default function AuthForm() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const { loginAsync } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const response = await loginAsync(username, password)
			if (!response.success) setErrorMessage(response.message)
			console.log('response', response)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box
			sx={{
				maxWidth: 400,
				mx: 'auto',
				mt: 8,
				p: 4,
				border: '1px solid #ccc',
				borderRadius: 2,
				boxShadow: 2
			}}
		>
			<Typography
				variant="h4"
				align="center"
				gutterBottom
			>
				Login
			</Typography>
			{errorMessage && (
				<Typography
					justifyContent={'center'}
					color="error"
					variant="subtitle1"
					align="center"
					gutterBottom
					alignItems={'center'}
					display={'flex'}
					gap={'3px'}
				>
					<ErrorOutline color="error" />
					{errorMessage}
				</Typography>
			)}

			<form onSubmit={handleSubmit}>
				<TextField
					label="User"
					variant="outlined"
					fullWidth
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					margin="normal"
					required
				/>
				<TextField
					label="Password"
					variant="outlined"
					type="password"
					fullWidth
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					margin="normal"
					required
				/>
				<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						disabled={loading}
					>
						{loading ? (
							<CircularProgress
								size={24}
								sx={{ color: '#fff' }}
							/>
						) : (
							'Login'
						)}
					</Button>
				</Box>
			</form>
		</Box>
	)
}
