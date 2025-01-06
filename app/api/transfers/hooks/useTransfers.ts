import { addTransfer, deleteTransfer, getTransferById, getTransfers, updateTransfer } from '@api/transfers/index'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Transferencia } from 'app/types'

export const useTransfers = () => {
	return useQuery({
		queryKey: ['transfers'], // Clave única para el query
		queryFn: getTransfers, // Función que obtiene los datos
		staleTime: 1000 * 60 * 5 // Datos "frescos" por 5 minutos
	})
}

export const useAddTransfers = () => {
	const queryClient = useQueryClient()

	return useMutation<Transferencia, Error, Omit<Transferencia, 'id'>>({
		mutationFn: addTransfer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transfers'] })
		}
	})
}

export const useTransferById = (id: number | false) => {
	return useQuery<Transferencia, Error>({
		queryKey: ['transferencia', id], // Clave única para cada transferencia por ID
		queryFn: () => getTransferById(id as number), // Función que obtiene la transferencia por ID
		enabled: !!id, // Solo ejecuta la consulta si el ID es válido
		staleTime: 1000 * 60 * 5 // Datos "frescos" por 5 minutos
	})
}

export const useUpdateTransfer = () => {
	const queryClient = useQueryClient()

	return useMutation<Transferencia, Error, { id: number; data: Partial<Transferencia> }>({
		mutationFn: ({ id, data }) => updateTransfer(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transfers'] })
		}
	})
}

export const useDeleteTransfer = () => {
	const queryClient = useQueryClient()

	return useMutation<Transferencia, Error, { id: number }>({
		mutationFn: ({ id }) => deleteTransfer(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transfers'] })
		}
	})
}
