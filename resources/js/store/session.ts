import { LoginResponse } from '@/http/content'
import { defineStore } from 'pinia'

export const useSession = defineStore({
  id: 'session',
  state: () => ({
    userContent: localStorage.getItem('userContent') || false,
    user: false as LoginResponse | boolean,
    campaign: localStorage.getItem('campaign') || {}
  }),
  getters: {},
  actions: {}
})
