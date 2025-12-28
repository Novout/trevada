import * as PIXI from 'pixi.js'
import Controller, { BUTTON } from 'pixi-controller'
import Factory from 'pixi-factory'
import { useOptions } from '@/store/campaign/options'
import { useLoader } from '@/use/canvas/loader'
import { useContext } from '@/store/context'
import { useController } from '@/use/canvas/controller'
import { useGlobal } from '@/store/global'
import { useTilemap } from './tilemap'
import { useBackground } from './background'
import { useToken } from './token'
import UI from '@/defines/canvas/loader/ui.json'
import INTERACTIVE from '@/defines/canvas/loader/interactive.json'

export const useCanvas = () => {
  let app: PIXI.Application
  const context = useContext()
  const options = useOptions()
  const controller = useController()
  const global = useGlobal()

  const init = () => {
    PIXI.utils.skipHello()

    /* TODO: Request backend content  */
    options.setFirstLayer({
      path: 'https://i.imgur.com/bDqFxOn.jpeg',
      type: 'image',
      name: 'request-from-api-background'
    })

    options.setSecondaryLayer({
      size: [23, 48],
      max: 100,
      background: ['0x0165FF', '0x01C5FF'],
      alpha: 0.25
    })

    const opt = options.getContext()

    app = new PIXI.Application({
      width: opt?.width || window.innerWidth,
      height: opt?.height || window.innerHeight,
      antialias: opt?.antialias || false,
      backgroundAlpha: opt.alpha ? 0 : 1
    })

    const canvas = document.getElementById(
      options.context?.path || 'interactive'
    )
    if (!canvas) return

    canvas.appendChild(app.view)

    load()
  }

  const load = () => {
    const [_load] = useLoader()

    if (options.background.type === 'image')
      _load(
        [
          ...UI,
          ...INTERACTIVE,
          [options.background.name, options.background.path]
        ],
        setup
      )
    else _load([...UI], setup)
  }

  const setup = (loader: PIXI.Loader, resources: any) => {
    useBackground().create(app.stage, options.$state, resources)

    useTilemap().create(app.stage, options.tilemap)

    context.group = Factory.Group.create(
      [
        [
          'guest',
          useToken().create({
            resources,
            texture: 'logo',
            stage: app.stage,
            width: options.tilemap.max,
            height: options.tilemap.max,
            node: options.tilemap.max,
            size: 2,
            mapSize: options.tilemap.size,
            x: 100,
            y: 100,
            bar: {
              principal: {
                color: 0xffffff
              }
            }
          })
        ],
      ],
      { container: app.stage, key: true }
    )

    if (global.pixi.loaded) {
      Controller.setContext((app as PIXI.Application).view as HTMLCanvasElement)
    }

    Controller.Mouse.prevent(BUTTON.LEFT)
    Controller.Mouse.prevent(BUTTON.RIGHT)

    const canvas = document.getElementById(
      options.context?.path || 'interactive'
    )
    if (!canvas) return

    //setScroll(app.stage)
    //zoomScroll(app.stage, app.renderer as PIXI.Renderer)

    app.renderer.resize(
      options.tilemap.max * options.tilemap.size[0],
      options.tilemap.max * options.tilemap.size[1]
    )

    app?.ticker.add((delta: number) => {
      controller.set(delta, options.tilemap)
    })
  }

  const destroy = () => {
    context.reset()

    if (global.pixi.loaded) {
      Controller.reset()
    }

    app.destroy(true)

    PIXI.Loader.shared.destroy()
  }

  const reload = async () => {
    await destroy()
    init()
  }

  return { init, setup, destroy, reload }
}
