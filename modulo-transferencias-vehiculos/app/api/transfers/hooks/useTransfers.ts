import { addTransferencia, deleteTransferencia, getTransferenciaById, getTransferencias, updateTransferencia } from '@api/transfers/index'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Transferencia } from 'app/types'

export const useTransferencias = () => {
	return useQuery({
		queryKey: ['transferencias'], // Clave única para el query
		queryFn: getTransferencias, // Función que obtiene los datos
		staleTime: 1000 * 60 * 5 // Datos "frescos" por 5 minutos
	})
}

export const useAddTransferencia = () => {
	const queryClient = useQueryClient()

	return useMutation<Transferencia, Error, Omit<Transferencia, 'id'>>({
		mutationFn: addTransferencia,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transferencias'] })
		}
	})
}

export const useTransferenciaById = (id: number | false) => {
	return useQuery<Transferencia, Error>({
		queryKey: ['transferencia', id], // Clave única para cada transferencia por ID
		queryFn: () => getTransferenciaById(id as number), // Función que obtiene la transferencia por ID
		enabled: !!id, // Solo ejecuta la consulta si el ID es válido
		staleTime: 1000 * 60 * 5 // Datos "frescos" por 5 minutos
	})
}

export const useUpdateTransferencia = () => {
	const queryClient = useQueryClient()

	return useMutation<Transferencia, Error, { id: number; data: Partial<Transferencia> }>({
		mutationFn: ({ id, data }) => updateTransferencia(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transferencias'] })
		}
	})
}

export const useDeleteTransferencia = () => {
	const queryClient = useQueryClient()

	return useMutation<Transferencia, Error, { id: number }>({
		mutationFn: ({ id }) => deleteTransferencia(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['transferencias'] })
		}
	})
}
