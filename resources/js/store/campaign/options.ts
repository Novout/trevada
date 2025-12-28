import { defineStore } from 'pinia'

export interface ContextOptions {
  width?: number
  height?: number
  path?: string
  alpha?: boolean
  antialias?: boolean
}

interface BackgroundOptionsSize {
  width: number
  height: number
}

export interface BackgroundOptions {
  type: 'none' | 'image' | 'color'
  path: string
  name: string
  size?: BackgroundOptionsSize
}

export interface InitializeOptionsBorder {
  color: number
  line: number
}

export interface TilemapOptions {
  background: Array<string> | string
  size: Array<number>
  max: number
  alpha?: number
  onlyBorder?: InitializeOptionsBorder
  onlyExample?: boolean;
}

export interface StylePlayerOptions {
  color: string;
}

export interface StyleOptions {
  player: StylePlayerOptions
}

export const useOptions = defineStore({
  id: 'campaign-options',
  state: () => ({
    context: {
      width: undefined,
      height: undefined,
      path: undefined,
      alpha: true,
      antialias: true
    } as ContextOptions,
    background: {
      type: 'none',
      path: '',
      name: ''
    } as BackgroundOptions,
    tilemap: {
      background: ['white', 'black'],
      size: [10, 10],
      max: 100
    } as TilemapOptions,
    style: {
      player: {
        color: '#FF6D01'
      }
    } as StyleOptions
  }),
  actions: {
    getContext(): ContextOptions {
      return this.context
    },
    getBackground(): BackgroundOptions {
      return this.background
    },
    getTilemap(): TilemapOptions {
      return this.tilemap
    },
    setContext(context: ContextOptions) {
      this.context = context
    },
    setFirstLayer(background: BackgroundOptions) {
      this.background = background
    },
    setSecondaryLayer(tilemap: TilemapOptions) {
      this.tilemap = tilemap
    },
    setThirdLayer() {},
    reset() {}
  }
})
