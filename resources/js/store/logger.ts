import { defineStore } from 'pinia'
import { Maybe } from '@/utils'

interface ListContent {
  content: string,
  color: string
}

export const useLogger = defineStore({
  id: 'logger',
  state: () => ({
    id: 'CRITICAL',
    list: [] as Array<ListContent>
  }),
  getters: {},
  actions: {
    emit(content: string, color = 'clean') {
      let _color: Maybe<string>

      switch (color) {
        case 'success':
          _color = '#1AD500'
          break
        case 'warning':
          _color = '#FFBD00'
          break
        case 'error':
          _color = '#E70000'
          break
        case 'clean':
          _color = 'var(--text-primary)'
          break
        default:
          throw new Error(`[${this.id}]: emit() event breaker in color`)
      }

      const _content = `[${this.id}]: ${content}`

      this.list.push({ content: _content as string, color: _color as string })
    },
    reset() {
      this.list = []
      this.emit('Logger clear!', 'clean')
    }
  }
})
