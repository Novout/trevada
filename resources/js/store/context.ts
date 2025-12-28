import { defineStore } from 'pinia'
import { Container } from 'pixi.js'
import { Group } from 'pixi-factory'
import { CriticalResource, Maybe } from '@/utils'

export const useContext = defineStore({
  id: 'context',
  state: () => ({
    map: {
      hover: false
    },
    token: {
      click: false,
      control: false,
      controlAnimationYUp: false,
      controlAnimationXLeft: false,
      controlAnimationYDown: false,
      controlAnimationXRight: false,
      controlChatMessage: false,
      data: false as any
    },
    group: undefined as Maybe<Group>,
    resources: [],
    chat: [] as any
  }),
  actions: {
    setTokenData(token: Container | boolean) {
      this.token.data = token
    },
    setTokenClick(click: boolean) {
      this.token.click = click
    },
    setTokenControl(click: boolean) {
      this.token.control = click
    },
    setTokenAnimationY(click: boolean, type: string) {
      if (type === 'up') this.token.controlAnimationYUp = click
      else if (type === 'down') this.token.controlAnimationYDown = click
    },
    setTokenAnimationX(click: boolean, type: string) {
      if (type === 'left') this.token.controlAnimationXLeft = click
      else if (type === 'right') this.token.controlAnimationXRight = click
    },
    centerInNode(TILEMAP: any) {
      if (!this.token.data) return

      const centerX =
        this.token.data.x + this.token.data.width / 2 - (TILEMAP.max * 1) / 2
      const centerY =
        this.token.data.y + this.token.data.height / 2 - (TILEMAP.max * 1) / 2

      const set = { x: 0, y: 0 }

      for (let y = 0; y < TILEMAP.size[1]; y++) {
        for (let x = 0; x < TILEMAP.size[0]; x++) {
          if (
            x * TILEMAP.max - TILEMAP.max / 2 <= centerX &&
            (x + 1) * TILEMAP.max >= centerX
          ) {
            set.x = (x - (this.token.data.size !== 1 ? 1 : 0)) * TILEMAP.max
          }
        }
        if (
          y * TILEMAP.max - TILEMAP.max / 2 <= centerY &&
          (y + 1) * TILEMAP.max >= centerY
        ) {
          set.y = (y - (this.token.data.size !== 1 ? 1 : 0)) * TILEMAP.max
        }
      }

      this.token.data.x = set.x
      this.token.data.y = set.y
    },
    reset() {
      this.map.hover = false
      this.token.click = false
      this.token.control = false
      this.token.controlAnimationYUp = false
      this.token.controlAnimationXLeft = false
      this.token.controlAnimationYDown = false
      this.token.controlAnimationXRight = false
      this.token.data = false
    }
  }
})
