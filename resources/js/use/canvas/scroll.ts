import { Container, InteractionEvent, Renderer } from 'pixi.js'
import Controller from 'pixi-controller'
import { useContext } from '@/store/context'

export const useScroll = () => {
  const context = useContext()

  const setScroll = (stage: Container) => {
    stage.interactive = true

    stage.on('pointerover', (e: InteractionEvent) => {
      context.map.hover = true
    })

    stage.on('pointerout', (e: InteractionEvent) => {
      context.map.hover = false
    })
  }

  const zoomScroll = (stage: Container, renderer: Renderer) => {
    const listener = (event: any) => {
      if (context.map.hover) {
        if (event.wheelDelta >= 0) {
          if (stage.scale.x >= 1.2 || stage.scale.y >= 1.2) return
          stage.scale.x += 0.1
          stage.scale.y += 0.1
          // renderer.resize(renderer.width + (renderer.width * (10 / 100)), renderer.height + (renderer.height * (10 / 100)))
        } else {
          if (stage.scale.x <= 0.4 || stage.scale.y <= 0.4) return
          stage.scale.x -= 0.1
          stage.scale.y -= 0.1
          // renderer.resize(renderer.width - (renderer.width * (10 / 100)), renderer.height - (renderer.height * (10 / 100)))
        }
      }
    }

    window.addEventListener('scroll', () => {
      if (context.map.hover) window.scrollTo(0, 0)
    })

    Controller.getContext().addEventListener('mousewheel', listener, {
      passive: true
    })
  }

  return { zoomScroll, setScroll }
}
