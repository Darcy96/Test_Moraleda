'use client'
import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface Props {
	open: boolean
	title: string
	message: string
	closeAction: () => void
	agreementAction: () => void
}
export default function MyDialog({ open, title, message, closeAction, agreementAction }: Props) {
	const handleClose = () => {
		closeAction()
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={agreementAction}>Yes</Button>
				<Button
					onClick={handleClose}
					autoFocus
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}
