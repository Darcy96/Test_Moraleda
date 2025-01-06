'use client'

import { useAddTransfers, useClients, useDeleteTransfer, useTransferById, useUpdateTransfer } from '@api/transfers/hooks'
import { Box, Button, Paper, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DeleteForever } from '@mui/icons-material'
import { Transferencia } from 'app/types'

import { MyDialog, MySpinner } from '@components/molecules'
import { TransferForm } from '@components/organisms'
import { usePermissions } from '@hooks/usePermissions'

interface Props {
	transferId?: number
}

export default function TransferFormPage({ transferId }: Props) {
	const theme = useTheme() // 🎨 Accessing Material UI theme for responsiveness
	const { data: transferData, isLoading } = useTransferById(transferId || false) // 🎣 Fetching transfer data by ID (if available)
	const { data: clients } = useClients() // 🎣 Fetching client data
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')) // 📱 Checking if the screen is small

	// 🎣 Accessing permissions and router instance
	const { hasPermission } = usePermissions()
	const router = useRouter()

	// 🎣 React Query mutations for API interactions
	const create = useAddTransfers()
	const edit = useUpdateTransfer()
	const deleteAction = useDeleteTransfer()

	// 🗃️ State variables for managing UI and data
	const [open, setOpen] = useState(false) // 🗃️ State for dialog visibility
	const [formData, setFormData] = useState<Omit<Transferencia, 'id'>>({
		// ℹ️ Form data (excluding 'id')
		type: 'Venta',
		service: 0,
		client: '',
		transmitter: '',
		plate: ''
	})

	// 🔄 Updating form data when transfer data is available
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

	// 🖱️ Handling dialog open and delete actions
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleDelete = () => {
		deleteAction.mutateAsync({ id: transferId as number })
		setOpen(false)
		router.push('/transfers')
	}

	// ⏳ Showing loading spinner while fetching transfer data
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
