import { getUsers, getUsersByDocument } from '@api/transfers/handlers'
import { useQuery } from '@tanstack/react-query'
import { Users } from 'app/types'

export const useClients = () => {
	return useQuery({
		queryKey: ['clients'],
		queryFn: getUsers,
		staleTime: 1000 * 60 * 5
	})
}

export const useClientByDocument = (id: string) => {
	return useQuery<Users, Error>({
		queryKey: ['clients', id],
		queryFn: () => getUsersByDocument(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 5
	})
}
