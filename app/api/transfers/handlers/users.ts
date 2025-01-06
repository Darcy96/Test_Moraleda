import { UsersMock } from '@api/transfers/mock'
import { Users } from 'app/types'

// Obtener todas los clientes
export const getUsers = async (): Promise<Users[]> => {
	return Promise.resolve(UsersMock)
}

// Consultar un cliente por ID
export const getUsersByDocument = async (id: string): Promise<Users> => {
	const user = UsersMock.find((item) => item.document === id)
	if (user) {
		return Promise.resolve(user)
	}
	return Promise.reject(new Error('Transferencia no encontrada'))
}
