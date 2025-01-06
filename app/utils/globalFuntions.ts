export function stringAvatar(name: string) {
    const nameParts = name.split(' ')
    let initials = nameParts[0][0].toUpperCase() // Inicial del primer nombre

    if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1][0].toUpperCase() // Inicial del último nombre si existe
    }
    return initials
}