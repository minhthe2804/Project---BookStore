export interface Auth {
    id: string
    name: {
        firstname: string
        lastname: string
    }
    username: string
    email: string
    password: string
    role: string
    createdAt?: string
    updateAt?: string
}
