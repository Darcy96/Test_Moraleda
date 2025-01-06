import { NextResponse } from 'next/server'
import { usersMock } from '../mock'


export async function POST(request: Request) {
	const { username, password } = await request.json()

	const user = usersMock.find((u) => u.username === username && u.password === password)

	if (!user) {
		return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 })
	}

	const response = NextResponse.json({ success: true, role: user.role, username: user.username, permissions:user.permissions })

	return response
}
