'use client'
import { useAuth } from '@context/AuthContext'
import { Logout } from '@mui/icons-material'
import { Box, ButtonBase, Avatar, Popper, Fade, Paper, Button } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { stringAvatar } from '@utils/globalFuntions'
import React, { useState } from 'react'

export default function ButtonMenu() {
	const { user, logout } = useAuth()

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [open, setOpen] = useState(false)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
		setOpen((previousOpen) => !previousOpen)
	}

	const handleLogout = () => {
		setAnchorEl(null)
		setOpen(false)
		logout()
	}

	return (
		<Box>
			{user?.username && (
				<ButtonBase
					onClick={handleClick}
					sx={{
						bgcolor: open ? 'rgb(195 187 187 / 50%)' : 'transparent',
						gap: '5px',
						padding: '10px',
						borderRadius: '6px',
						textTransform: 'capitalize'
					}}
				>
					<Avatar sx={{ width: 30, height: 30, bgcolor: deepOrange[500] }}>{stringAvatar(user?.username || 'A')}</Avatar>
					{user?.username}
				</ButtonBase>
			)}

			{open && (
				<Popper
					sx={{ zIndex: 1200, width: '200px' }}
					open={open}
					anchorEl={anchorEl}
					placement={'bottom-end'}
					transition
					modifiers={[
						{
							name: 'offset',
							options: {
								offset: [0, 2]
							}
						}
					]}
				>
					{({ TransitionProps }) => (
						<Fade
							{...TransitionProps}
							timeout={350}
						>
							<Paper sx={{ height: '-webkit-fill-available', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 2 }}>
								<Button
									color="info"
									variant="contained"
									startIcon={<Logout />}
									onClick={handleLogout}
								>
									Logout
								</Button>
							</Paper>
						</Fade>
					)}
				</Popper>
			)}
		</Box>
	)
}
