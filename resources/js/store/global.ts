import { defineStore } from 'pinia'
import { useContext } from './context'

export const useGlobal = defineStore({
  id: 'global',
  state: () => ({
    id: '__CRITICALVTT__GLOBAL',
    pixi: {
      loaded: false
    },
    animated: {
      token: true
    }
  }),
  actions: {
    reset() {
      this.animated.token = true
      useContext().reset()
    },
    save() {
      localStorage.setItem(this.id, JSON.stringify(this.$state))
    },
    load() {
      const _global = localStorage.getItem(this.id)

      if (_global && process.env.NODE_ENV === 'development') {
        this.clear()
        return
      }

      if (_global) {
        this.$state = JSON.parse(_global as string)
      }
    },
    clear() {
      localStorage.removeItem(this.id)
    }
  }
})
