import axios, { AxiosError, AxiosInstance } from 'axios'

export class HttpPurcharse {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:5004/',
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
const httpPurcharse = new HttpPurcharse().instance
export default httpPurcharse
