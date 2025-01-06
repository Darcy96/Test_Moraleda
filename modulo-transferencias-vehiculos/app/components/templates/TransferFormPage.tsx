'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Button, Typography, Tooltip, Paper, useMediaQuery, useTheme } from '@mui/material'
import { useAddTransfers, useClients, useDeleteTransfer, useTransferById, useUpdateTransfer } from '@api/transfers/hooks'

import { Transferencia } from 'app/types'
import { DeleteForever } from '@mui/icons-material'

import { TransferForm } from '@components/organisms'
import { MyDialog, MySpinner } from '@components/molecules'
import { usePermissions } from '@hooks/usePermissions'

interface Props {
	transferId?: number
}

export default function TransferFormPage({ transferId }: Props) {
	const theme = useTheme()
	const { data: transferData, isLoading } = useTransferById(transferId || false)
	const { data: clients } = useClients()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const { hasPermission } = usePermissions()
	const router = useRouter()
	const create = useAddTransfers()
	const edit = useUpdateTransfer()
	const deleteAction = useDeleteTransfer()
	const [open, setOpen] = useState(false)

	const [formData, setFormData] = useState<Omit<Transferencia, 'id'>>({
		type: 'Venta',
		service: 0,
		client: '',
		transmitter: '',
		plate: ''
	})

	useEffect(() => {
		if (transferId && transferData) {
			setFormData({
				plate: transferData.plate,
				type: transferData.type,
				client: transferData.client,
				transmitter: transferData.transmitter,
				service: transferData.service
			})
		}
	}, [transferData, transferId])

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleDelete = () => {
		deleteAction.mutateAsync({ id: transferId as number })
		setOpen(false)
		router.push('/transfers')
	}

	if (isLoading) {
		return <MySpinner message={'Loading form'} />
	}

	return (
		<Paper
			sx={{
				boxShadow: 'inherit',
				color: 'rgb(230, 235, 241)',
				border: '1px solid',
				width: isSmallScreen ? '100%' : '60vw',
				margin: 'auto',
				padding: '20px',
				flexDirection: 'column',
				display: 'flex'
			}}
		>
			<Box
				display={'flex'}
				flexDirection={'row'}
				justifyContent={'space-between'}
				marginBottom={'12px'}
			>
				<Typography
					variant="h5"
					color="textPrimary"
					gutterBottom
				>
					{transferId ? (hasPermission('edit') ? 'Edit transfer' : 'Transfer information') : 'Create transfer'}
				</Typography>
				{transferId && hasPermission('delete') && (
					<Tooltip
						placement="left-start"
						title={'Delete transfer'}
					>
						<span>
							<Button
								aria-label="delete"
								color="error"
								size="small"
								sx={{ width: 'fit-content', minWidth: '0px' }}
								onClick={handleClickOpen}
								startIcon={<DeleteForever />}
								variant="contained"
							>
								Delete
							</Button>
						</span>
					</Tooltip>
				)}
			</Box>

			<TransferForm
				formData={formData}
				setFormData={setFormData}
				clients={clients}
				hasPermission={hasPermission}
				create={create}
				router={router}
				edit={edit}
				transferId={transferId}
			/>
			<MyDialog
				open={open}
				title={'Delete transfer'}
				message={'Are you sure you want to proceed with this action?'}
				closeAction={() => setOpen(false)}
				agreementAction={handleDelete}
			/>
		</Paper>
	)
}
