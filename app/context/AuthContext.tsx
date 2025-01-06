'use client'

import Cookies from 'js-cookie' // 🍪 For managing cookies
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

// 📄 Importing types for user authentication and login response
import { AuthUser, LoginResponse } from 'app/types'

// 🎁 Defining the AuthContextProps interface
interface AuthContextProps {
	user: AuthUser | null // 🧑‍💼 Current authenticated user or null if not logged in
	loginAsync: (username: string, password: string) => Promise<LoginResponse> // 🚀 Function to handle user login
	logout: () => void // 🚪 Function to handle user logout
}

// ✨ Creating the AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined)

// 🧱 AuthProvider component to manage the authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<AuthUser | null>(null) // 🧑‍💼 State to store the authenticated user

	const router = useRouter() // 🧭 Accessing the Next.js router

	// 🔄 useEffect hook to check for existing user session on mount
	useEffect(() => {
		const username = Cookies.get('auth-token') // 🍪 Retrieving username from cookies
		const role = Cookies.get('user-role') // 🍪 Retrieving user role from cookies
		const permissions = Cookies.get('user-permissions') // 🍪 Retrieving user permissions from cookies
		const userPermissions: string[] = permissions ? JSON.parse(permissions) : [''] // 📄 Parsing user permissions

		// 🧑‍💼 If user data is found in cookies, set the user in the context
		if (username && role) {
			setUser({ username, role, permissions: userPermissions })
		}
	}, [])

	// 🚀 Asynchronous function to handle user login
	const loginAsync = async (username: string, password: string): Promise<LoginResponse> => {
		try {
			// 🌐 Sending a POST request to the login API endpoint
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' }
			})

			// ✅ If the login is successful
			if (res.ok) {
				const data = await res.json() // 📄 Parsing the response data

				// 🍪 Setting cookies for authentication, role, and permissions
				Cookies.set('auth-token', username, { secure: false, sameSite: 'strict' })
				Cookies.set('user-role', data.role, { secure: false, sameSite: 'strict' })
				Cookies.set('user-permissions', JSON.stringify(data.permissions), { secure: false, sameSite: 'strict' })

				// 🧑‍💼 Updating the user state in the context
				setUser({ username, role: data.role, permissions: data.permissions })

				router.replace('/transfers') // 🧭 Redirecting to the transfers page

				// ✅ Returning a success response
				return { success: true, message: 'Inicio de sesión exitoso' }
			} else {
				const message = await res.json() // 📄 Parsing the error message

				// ❌ Returning an error response
				return { success: false, message: message.message || 'Error en el inicio de sesión' }
			}
		} catch (err) {
			console.error(err) // ❌ Logging the error

			// ❌ Returning an error response in case of an exception
			return { success: false, message: 'Error en el inicio de sesión' }
		}
	}

	// 🚪 Function to handle user logout
	const logout = () => {
		Cookies.remove('auth-token') // 🍪 Removing authentication token from cookies
		Cookies.remove('user-role') // 🍪 Removing user role from cookies
		router.push('/auth') // 🧭 Redirecting to the login page
		setUser(null) // 🧑‍💼 Setting the user to null in the context
	}

	// 🎁 Providing the authentication context value to child components
	return <AuthContext.Provider value={{ user, loginAsync, logout }}>{children}</AuthContext.Provider>
}

// 🎣 Custom hook to access the authentication context
export const useAuth = () => {
	const context = useContext(AuthContext)

	// ⚠️ Throwing an error if the hook is used outside of the AuthProvider
	if (!context) {
		throw new Error('useAuth debe ser usado dentro de un AuthProvider')
	}

	return context
}

export default AuthProvider
