'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { AuthUser, LoginResponse } from 'app/types'

interface AuthContextProps {
	user: AuthUser | null
	loginAsync: (username: string, password: string) => Promise<LoginResponse>
	logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<AuthUser | null>(null)

	const router = useRouter()

	useEffect(() => {
		const username = Cookies.get('auth-token')
		const role = Cookies.get('user-role')
		const permissions = Cookies.get('user-permissions')
		const userPermissions: string[] = permissions ? JSON.parse(permissions) : ['']

		if (username && role) {
			setUser({ username, role, permissions: userPermissions })
		}
	}, [])

	const loginAsync = async (username: string, password: string): Promise<LoginResponse> => {
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' }
			})

			if (res.ok) {
				const data = await res.json()

				Cookies.set('auth-token', username, { secure: false, sameSite: 'strict' })
				Cookies.set('user-role', data.role, { secure: false, sameSite: 'strict' })
				Cookies.set('user-permissions', JSON.stringify(data.permissions), { secure: false, sameSite: 'strict' })

				setUser({ username, role: data.role, permissions: data.permissions })
				router.push('/transfers')

				// Devolver una respuesta de éxito
				return { success: true, message: 'Inicio de sesión exitoso' }
			} else {
				const message = await res.json()

				// Devolver una respuesta de error
				return { success: false, message: message.message || 'Error en el inicio de sesión' }
			}
		} catch (err) {
			console.error(err)
			// Devolver una respuesta de error en caso de excepción
			return { success: false, message: 'Error en el inicio de sesión' }
		}
	}

	const logout = () => {
		Cookies.remove('auth-token')
		Cookies.remove('user-role')
		router.push('/auth')
		setUser(null)
	}

	return <AuthContext.Provider value={{ user, loginAsync, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth debe ser usado dentro de un AuthProvider')
	}
	return context
}

export default AuthProvider
