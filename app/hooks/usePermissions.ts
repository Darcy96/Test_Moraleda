import { useAuth } from 'app/context/AuthContext'

export const usePermissions = () => {
	const { user } = useAuth()

	const hasPermission = (permission: string): boolean => {
		if (!user) return false // Usuario no autenticado

		return user?.permissions?.includes(permission) || false
	}

	return { hasPermission }
}
