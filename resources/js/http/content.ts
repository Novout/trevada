export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams {
  email: string
  password: string
  preferences: any
  name: string
}

export interface UserSchema {
  id: number
  name: string
  email: string
  image: string
  password: string
  preferences: any
  updated_at: string
  created_at: string
}

export interface RegisterResponse {
  status: number
  user: UserSchema
}

export interface LoginResponse {
  status: number
  user: UserSchema
  campaigns: Array<any>
  token: string
  token_type: string
  expires_in: number
}
