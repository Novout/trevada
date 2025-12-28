import { Container, Graphics, filters } from 'pixi.js'
import { useLogger } from '@/store/logger'
import { TilemapOptions } from '@/store/campaign/options'
import { useController } from './controller'

export const useTilemap = () => {
  const logger = useLogger()
  const controller = useController()

  const create = (container: Container, options: TilemapOptions) => {
    const append = new Container()
    container.addChild(append)
    let _color = false

    if (options.alpha && !options.onlyExample) {

      if(options.onlyBorder) append.filters = [new filters.AlphaFilter(1)]
      else append.filters = [new filters.AlphaFilter(options.alpha)]
    }

    for (let y = 0; y < options.size[1]; y++) {
      for (let x = 0; x < options.size[0]; x++) {
        const node = new Graphics()
        if (options.onlyBorder)
          node.lineStyle(options.onlyBorder.line, options.onlyBorder.color)
        else
          node.beginFill(
            _color
              ? Number(options.background[0])
              : Number(options.background[1])
          )
        node.drawRect(
          options.max * x,
          options.max * y,
          options.max,
          options.max
        )
        node.endFill()
        node.interactive = true
        if(options.onlyExample) node.filters = [new filters.AlphaFilter(options.alpha)]
        node.on('click', () => controller.resetTokenControl())

        if (!node) logger.emit('A node failed in creation', 'error')

        append.addChild(node)

        _color = !_color
      }

      if (options.size[0] % 2 === 0) _color = !_color
    }

    logger.emit('Create a tilemap nodes', 'success')
  }

  return { create }
}
