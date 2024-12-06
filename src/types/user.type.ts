export interface User {
    id: string
    name: {
        firstname: string
        lastname: string
    }
    username: string
    email: string
    password: string
    address?: string
    phone?: string
}
