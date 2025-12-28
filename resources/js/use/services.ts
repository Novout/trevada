import HTTP, { BearerToken } from '@/http'
import {
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse
} from '@/http/content'
import { useSession } from '@/store/session'

export const useServices = () => {
  const auth = () => {
    const get = () => {
      return new Promise(async (res) => {
        const response = await HTTP.get('users/me', {
          headers: BearerToken()
        })

        res(response.data)
      })
    }

    const image = (params: any) => {
      return new Promise(async (res) => {
        const response = await HTTP.put(
          `users/${(useSession().user as any).user.id}?image=${params.image}`
        )

        res(response.data)
      })
    }

    const login = (params: LoginParams): Promise<any> => {
      return new Promise(async (res, rej) => {
        const response = await HTTP.post('/auth/login', {}, { params }).catch(
          (res) => {
            rej(res)
          }
        )

        res(response)
      })
    }

    const register = (params: RegisterParams): Promise<RegisterResponse> => {
      return new Promise(async (res, rej) => {
        const response = await HTTP.post(
          '/auth/register',
          {},
          { params }
        ).catch((response) => {
          rej(response)
        })

        // @ts-ignore
        res(response)
      })
    }

    return {
      get,
      login,
      register,
      image
    }
  }

  const users = () => {
    const getUser = async () => {}

    const remove = (id: number) => {
      return new Promise(async (res) => {
        const response = await HTTP.delete(`users/${id}`, {
          headers: BearerToken(),
          params: {
            id
          }
        })

        res(response.data)
      })
    }

    return {
      getUser,
      delete: remove
    }
  }

  const campaigns = () => {
    const create = (params: Record<string, any>) => {
      return new Promise(async (res, rej) => {
        const response = await HTTP.post(
          'campaign',
          {},
          { headers: BearerToken(), params }
        ).catch((response) => {
          rej(response)
        })

        // @ts-ignore
        res(response)
      })
    }

    const add = (params: Record<string, any>) => {
      return new Promise(async (res) => {
        const response = await HTTP.put('campaign/me', {
          headers: BearerToken(),
          params
        })

        res(response.data)
      })
    }

    const remove = (params: Record<string, any>) => {
      return new Promise(async (res, rej) => {
        const response = await HTTP.delete(`campaign/${params.id}`, {
          headers: BearerToken()
        })

        if (response.status !== 204) rej(response.status)

        res(response.data)
      })
    }

    const getCode = async (params: Record<string, any>) => {
      return new Promise(async (res) => {
        const response = await HTTP.get('campaign/code', {
          headers: BearerToken(),
          params
        })

        res(response.data)
      })
    }

    return {
      create,
      add,
      delete: remove,
      getCode
    }
  }

  return {
    auth,
    users,
    campaigns
  }
}
