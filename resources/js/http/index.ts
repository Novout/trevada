import axios, { AxiosInstance } from 'axios'
import { useSession } from '@/store/session'
import { LoginResponse } from './content'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export const BearerToken = () => {
  const session = useSession()

  return { Authorization: `Bearer ${(session.user as LoginResponse).token}` }
}

export default instance
