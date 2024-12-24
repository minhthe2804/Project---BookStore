import { Auth } from '~/types/auth.type'
import { User } from '~/types/user.type'
import httpAuth from '~/utils/httpUser'

const URL = '/user'
export const authApi = {
    register: (body: Omit<Auth, 'id'>) => {
        return httpAuth.post<Auth>(URL, body)
    },
    registerAcount: () => httpAuth.get<Auth[]>(URL),
    login: () => httpAuth.get<Auth[]>(URL),
    forgotPassword: (id: string, body: Omit<Auth, 'id'>) => httpAuth.put<Auth>(`${URL}/${id}`, body),
    updateProfile: (id: string, body: User) => httpAuth.put<User>(`${URL}/${id}`, body)
}
