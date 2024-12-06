import axios, { AxiosError, AxiosInstance } from 'axios'

export class HttpAuth {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:5001/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        this.instance.interceptors.request.use(
            (config) => {
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        // Add a response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                return response
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )
    }
}
const httpAuth = new HttpAuth().instance
export default httpAuth
