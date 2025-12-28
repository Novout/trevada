import Controller, { PLAYER } from 'pixi-controller'
import { useContext } from '@/store/context'
import { useGlobal } from '@/store/global'
import { TilemapOptions } from '@/store/campaign/options'
import GSAP, { Expo } from 'gsap'

export const useController = () => {
  const global = useGlobal()
  const context = useContext()

  const set = (delta: number, background: TilemapOptions) => {
    if(context.token.controlChatMessage) return

    if (
      Controller.Keyboard.isKeyPressed(...PLAYER.LEFT) &&
      context.token.control
    ) {
      if (context.token.data.x - background.max < 0) return

      if (global.animated.token) {
        if (context.token.controlAnimationXRight) return

        const tokenTimeline = GSAP.timeline({
          onStart: () => {
            context.setTokenAnimationX(true, 'left')
          },
          onComplete: () => {
            context.setTokenAnimationX(false, 'left')
            context.centerInNode(background)
          }
        })

        tokenTimeline.to(context.token.data, {
          x: context.token.data.x - background.max,
          duration: 0.5,
          ease: Expo.easeOut
        })
      } else {
        context.token.data.x -= background.max
      }
    }

    if (
      Controller.Keyboard.isKeyPressed(...PLAYER.RIGHT) &&
      context.token.control
    ) {
      if (
        context.token.data.x + background.max >=
          background.max * background.size[0] - 1 ||
        context.token.controlAnimationXLeft
      )
        return

      if (global.animated.token) {
        if (context.token.controlAnimationXLeft) return

        const tokenTimeline = GSAP.timeline({
          onStart: () => {
            context.setTokenAnimationX(true, 'right')
          },
          onComplete: () => {
            context.setTokenAnimationX(false, 'right')
            context.centerInNode(background)
          }
        })

        tokenTimeline.to(context.token.data, {
          x: context.token.data.x + background.max,
          duration: 0.5,
          ease: Expo.easeOut
        })
      } else {
        context.token.data.x += background.max
      }
    }

    if (
      Controller.Keyboard.isKeyPressed(...PLAYER.UP) &&
      context.token.control
    ) {
      if (context.token.data.y - background.max < 0) return

      if (global.animated.token) {
        if (context.token.controlAnimationYDown) return

        const tokenTimeline = GSAP.timeline({
          onStart: () => {
            context.setTokenAnimationY(true, 'up')
          },
          onComplete: () => {
            context.setTokenAnimationY(false, 'up')
            context.centerInNode(background)
          }
        })

        tokenTimeline.to(context.token.data, {
          y: context.token.data.y - background.max,
          duration: 0.5,
          ease: Expo.easeOut
        })
      } else {
        context.token.data.y -= background.max
      }
    }

    if (
      Controller.Keyboard.isKeyPressed(...PLAYER.DOWN) &&
      context.token.control
    ) {
      if (
        context.token.data.y + background.max >=
        background.max * background.size[1] - 1
      )
        return

      if (global.animated.token) {
        if (context.token.controlAnimationYUp) return

        const tokenTimeline = GSAP.timeline({
          onStart: () => {
            context.setTokenAnimationY(true, 'down')
          },
          onComplete: () => {
            context.setTokenAnimationY(false, 'down')
            context.centerInNode(background)
          }
        })

        tokenTimeline.to(context.token.data, {
          y: context.token.data.y + background.max,
          duration: 0.5,
          ease: Expo.easeOut
        })
      } else {
        context.token.data.y += background.max
      }
    }

    Controller.update()
  }

  const resetTokenControl = (): any => {
    context.setTokenClick(false)
    context.setTokenControl(false)
    if (!context.token.data) return

    // @ts-ignore
    context.token.data.utils.select.visible = false
    // @ts-ignore
    context.token.data.utils.cancel.click()
  }

  return { set, resetTokenControl }
}
