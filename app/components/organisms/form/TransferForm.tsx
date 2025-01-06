'use client'

import { Box, Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Transferencia, Users } from 'app/types'

import { transferTypes } from '@constants/general'
import { UseMutationResult } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface Props {
	formData: Omit<Transferencia, 'id'>
	setFormData: React.Dispatch<React.SetStateAction<Omit<Transferencia, 'id'>>>
	clients: Users[] | undefined
	hasPermission: (permission: string) => boolean
	transferId?: number
	create: UseMutationResult<Transferencia, Error, Omit<Transferencia, 'id'>, unknown>
	router: AppRouterInstance
	edit: UseMutationResult<
		Transferencia,
		Error,
		{
			id: number
			data: Partial<Transferencia>
		},
		unknown
	>
}
export default function TransferForm({ transferId, create, edit, router, formData, setFormData, clients, hasPermission }: Props) {
	const [errors, setErrors] = useState<{ [K in keyof Transferencia]?: boolean }>({
		// ❌ State to track form errors
		plate: false,
		type: false,
		client: false,
		transmitter: false,
		service: false
	})

	// 🔄 Handles changes in form inputs
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: name === 'service' ? Number(value) : value }))
	}

	// ✅ Validates individual form fields
	const validateField = (value: string | number | undefined) =>
		value === undefined || (typeof value === 'string' && value.trim() === '') || (typeof value === 'number' && value <= 0)

	// ✅ Validates the entire form
	const validateForm = () => {
		const newErrors = {
			plate: validateField(formData.plate),
			type: validateField(formData.type),
			client: validateField(formData.client),
			transmitter: validateField(formData.transmitter),
			service: validateField(formData.service)
		}
		setErrors(newErrors)
		return !Object.values(newErrors).some(Boolean)
	}

	// 🚀 Handles form submission
	const handleSubmit = async () => {
		if (!validateForm()) return // 🚫 If form is invalid, prevent submission

		try {
			// 📝 Submit data for creation or update based on transferId
			transferId ? await edit.mutateAsync({ id: transferId as number, data: formData }) : await create.mutateAsync(formData)
			router.replace('/transfers') // 🧭 Redirect to transfers page after successful submission
		} catch (error) {
			console.error('Error creating transfer:', error) // ❌ Log any errors during submission
		}
	}

	const enableFields = hasPermission('edit') // 🔐 Check if the user has edit permission

	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			<TextField
				label="Plate"
				name="plate"
				disabled={!enableFields}
				value={formData.plate}
				onChange={handleChange}
				error={errors.plate}
				helperText={errors.plate && 'This field is required'}
			/>
			<TextField
				disabled={!enableFields}
				select
				label="Transfer Type"
				name="type"
				value={formData.type}
				onChange={handleChange}
				error={errors.type}
				helperText={errors.type && 'This field is required'}
			>
				{transferTypes.map((type) => (
					<MenuItem
						key={type}
						value={type}
					>
						{type}
					</MenuItem>
				))}
			</TextField>
			<TextField
				disabled={!enableFields}
				select
				label="Client"
				name="client"
				value={formData.client}
				onChange={handleChange}
				error={errors.client}
				helperText={errors.client && 'This field is required'}
			>
				{!clients ? (
					<MenuItem value="">Loading clients...</MenuItem>
				) : (
					clients
						.filter((client) => client.name.includes('Cliente'))
						.map((client) => (
							<MenuItem
								key={client.id}
								value={client.document}
							>
								{client.name} - {client.document}
							</MenuItem>
						))
				)}
			</TextField>
			<TextField
				disabled={!enableFields}
				select
				label="Transmitter"
				name="transmitter"
				value={formData.transmitter}
				onChange={handleChange}
				error={errors.transmitter}
				helperText={errors.transmitter && 'This field is required'}
			>
				{!clients ? (
					<MenuItem value="">Loading transmitter...</MenuItem>
				) : (
					clients
						.filter((client) => client.name.includes('Transmitente'))
						.map((client) => (
							<MenuItem
								key={client.id}
								value={client.document}
							>
								{client.name} - {client.document}
							</MenuItem>
						))
				)}
			</TextField>
			<TextField
				disabled={!enableFields}
				label="Service"
				name="service"
				type="number"
				value={formData.service}
				onChange={handleChange}
				error={errors.service}
				helperText={errors.service && 'This field must be a valid number'}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
				<Button
					variant="outlined"
					color="info"
					onClick={() => router.replace('/transfers')}
				>
					{hasPermission('edit') ? 'Cancel' : 'Go back'}
				</Button>
				{hasPermission('edit') && (
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={create.status == 'pending'}
					>
						{create.status == 'pending' || edit.status == 'pending' ? 'Saving...' : 'Save'}
					</Button>
				)}
			</Box>
		</Box>
	)
}
