import * as PIXI from 'pixi.js'
import Controller, { BUTTON } from 'pixi-controller'
import { useLoader } from './loader'
import { useTilemap } from './tilemap'
import { useToken } from './token'
import { useController } from './controller'
import { useContext } from '@/store/context'
import { useGlobal } from '@/store/global'
import INTERACTIVE from '@/defines/canvas/loader/interactive.json'
import UI from '@/defines/canvas/loader/ui.json'
import TILEMAP from '@/defines/canvas/background.json'

interface InitializeOptions {
  width?: number
  height?: number
  path?: string
  alpha?: boolean
}

export const useExample = () => {
  let app: PIXI.Application

  const context = useContext()
  const controller = useController()
  const global = useGlobal()

  const init = (options: InitializeOptions) => {
    PIXI.utils.skipHello()

    app = new PIXI.Application({
      width: options?.width || window.innerWidth,
      height: options?.height || window.innerHeight,
      antialias: true,
      backgroundAlpha: options.alpha ? 0 : 1
    })

    document
      .getElementById(options?.path || 'interactive')
      ?.appendChild(app.view)

    load()
  }

  const destroy = () => {
    context.reset()

    if (global.pixi.loaded) {
      Controller.reset()
    }

    app.destroy(true)
    PIXI.Loader.shared.destroy()
  }

  const setup = (loader: PIXI.Loader, resources: any) => {
    useTilemap().create(app.stage, TILEMAP)

    useToken().create({
      resources,
      texture: 'logo',
      stage: app.stage,
      width: TILEMAP.max,
      height: TILEMAP.max,
      node: TILEMAP.max,
      size: 1,
      mapSize: TILEMAP.size,
      x: 100,
      y: 100,
      bar: {
        principal: {
          color: 0xffffff
        }
      }
    })

    if (global.pixi.loaded) {
      Controller.setContext(app.view)
    }

    Controller.Mouse.prevent(BUTTON.LEFT)
    Controller.Mouse.prevent(BUTTON.RIGHT)

    app.ticker.add((delta: number) => {
      controller.set(delta, TILEMAP)
    })
  }

  const load = () => {
    const [_load] = useLoader()

    _load([...INTERACTIVE, ...UI], setup)
  }

  return {
    init,
    destroy
  }
}
