import { defineStore } from 'pinia'

export const useEmitter = defineStore({
  id: 'emitter',
  state: () => ({
    modal: 'none' as string
  }),
  getters: {},
  actions: {}
})
