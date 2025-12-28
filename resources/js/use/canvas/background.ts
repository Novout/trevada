import { Container, Sprite, Graphics } from 'pixi.js'
import { useController } from './controller'

export const useBackground = () => {
  const create = (stage: Container, options: any, resources: any) => {
    const controller = useController()

    const w = options.tilemap.max * options.tilemap.size[0]
    const h = options.tilemap.max * options.tilemap.size[1]

    if (options.background.type === 'color') {
      const _background = new Graphics()
      _background.beginFill(Number(options.background.path))
      _background.drawRect(0, 0, w, h)
      _background.endFill()
      _background.interactive = true
      _background.on('click', () => controller.resetTokenControl())
      stage.addChild(_background)
    } else if (options.background.type === 'image') {
      const _background = new Sprite(resources[options.background.name].texture)
      _background.width = w
      _background.height = h
      _background.interactive = true
      _background.on('click', () => controller.resetTokenControl())
      stage.addChild(_background)
    }
  }

  return { create }
}
