import {
  Container,
  Sprite,
  Graphics,
  Text,
  TextStyle,
  InteractionEvent,
  filters
} from 'pixi.js'
import GSAP, { Expo } from 'gsap'
import Factory from 'pixi-factory'
import { useContext } from '@/store/context'
import {
  Callback,
  CriticalToken,
  CriticalTokenGraphics,
  Maybe,
  ObjectRender
} from '@/utils'
import { useLogger } from '@/store/logger'

interface CreateBar {
  color: string | number
  widthSpacement?: number
  heightSpacement?: number
  width?: number
  height?: number
}
interface CreateTokenOptionsBar {
  principal?: CreateBar
  secondary?: CreateBar
}

interface CreateTokenOptions {
  resources: any
  texture: string
  stage: Container
  height: number
  width: number
  node: number
  size: number
  mapSize: Array<number>
  bar?: CreateTokenOptionsBar
  x?: number
  y?: number
}

export const useToken = () => {
  const context = useContext()
  const logger = useLogger()

  const create = (options: CreateTokenOptions): CriticalToken => {
    const select = new Graphics()
    select.filters = [new filters.AlphaFilter(0.5)]
    select.visible = false

    const token = new Container() as any
    token.x = options.x || 0
    token.y = options.y || 0
    token.interactive = true
    token.buttonMode = true
    token.size = options.size
    token.delete = () => {
      token.utils?.cancel.destroy(true)
      token.utils?.select.destroy(true)
      token.sprite?.destroy(true)
      token.destroy(true)
    }

    const sprite = Factory.Sprite.create(
      new Sprite(options.resources[options.texture].texture),
      {
        bump: true,
        d20rpg: true,
        critical: true,
        content: {
          width: options.width * options.size,
          height: options.height * options.size,
          dragging: false,
          interactive: true
        }
      }
    )

    const cancelEvents = () => {
      select.visible = false
      actionCancel.visible = false

      context.setTokenClick(false)
      context.setTokenControl(false)
      context.setTokenData(false)
    }

    const actionCancel = new Graphics() as CriticalTokenGraphics
    const actionCancelClickListener = () => {
      select.visible = false
      actionCancel.visible = false
      context.setTokenClick(false)

      setTimeout(() => {
        context.setTokenControl(false)
        context.setTokenData(false)
      })
    }
    const resetClickListeners: Callback = () => {
      if (context.token.data.utils) {
        context.token.data.utils!.select.visible = false
        // context.token.data.utils!.cancel.click()
      }
    }
    actionCancel.beginFill(0xffffff)
    actionCancel.drawCircle(
      sprite.x + sprite.width / 2,
      sprite.y + sprite.height / 2,
      options.width / 4
    )
    actionCancel.endFill()
    actionCancel.interactive = true
    actionCancel.visible = false
    actionCancel.x += options.node * options.size
    actionCancel.on('mousedown', actionCancelClickListener, 0)
    actionCancel.click = actionCancelClickListener
    const actionCancelSprite = new Sprite(
      options.resources.ui_token_cancel.texture
    )
    actionCancel.addChild(actionCancelSprite)
    actionCancelSprite.anchor.set(0.5, 0.5)
    actionCancelSprite.width = options.width / 2
    actionCancelSprite.height = options.height / 2
    actionCancelSprite.x += (options.width * options.size) / 2
    actionCancelSprite.y += (options.height * options.size) / 2

    token.on('click', (e: InteractionEvent) => {
      resetClickListeners()
      context.setTokenData(token)
      context.setTokenClick(true)
      select.visible = true
    })

    token.on('mousedown', (e: InteractionEvent) => {
      context.setTokenControl(true)

      setTimeout(() => {
        actionCancel.visible = true

        if (context.token.click) {
          sprite.dragging = true
          token.x = e.data.global.x - sprite.width / 2
          token.y = e.data.global.y - sprite.height / 2
        } else {
          actionCancel.visible = false
        }
      }, 0)
    })

    token.on('mousemove', (e: InteractionEvent) => {
      if (sprite.dragging) {
        token.x = e.data.global.x - sprite.width / 2
        token.y = e.data.global.y - sprite.height / 2
      }
    })

    token.on('mouseup', (e: InteractionEvent) => {
      const centerX = e.data.global.x - sprite.width / 2
      const centerY = e.data.global.y - sprite.height / 2
      const set = { x: 0, y: 0 }

      for (let y = 0; y < options.mapSize[1]; y++) {
        for (let x = 0; x < options.mapSize[0]; x++) {
          if (
            x * options.node - options.node / 2 <= centerX &&
            (x + 1) * options.node >= centerX
          ) {
            set.x = x * options.node
          }
          if (
            y * options.node - options.node / 2 <= centerY &&
            (y + 1) * options.node >= centerY
          ) {
            set.y = y * options.node
          }
        }
      }

      token.x = set.x
      token.y = set.y

      sprite.dragging = false
    })

    const border = new Graphics() as CriticalTokenGraphics
    border.lineStyle(5, 0x000000)
    border.drawCircle(
      sprite.x + sprite.width / 2,
      sprite.y + sprite.height / 2,
      (options.width / 2) * options.size
    )
    border.endFill()

    let bar: Maybe<Container>
    if (options.bar?.principal) {
      bar = new Container()
      bar.width = options.bar.principal.width || options.node / 4
      bar.height = options.bar.principal.height || options.node / 4

      const barBackgroundAlpha = new Graphics() as CriticalTokenGraphics
      barBackgroundAlpha.lineStyle(1, 0x000000)
      barBackgroundAlpha.beginFill(
        typeof options.bar.principal.color === 'string'
          ? Number(options.bar.principal.color)
          : options.bar.principal.color
      )
      barBackgroundAlpha.drawRect(
        0,
        0,
        options.bar.principal.width || options.width * options.size,
        options.bar.principal.height || (options.width * options.size) / 4
      )
      barBackgroundAlpha.endFill()
      barBackgroundAlpha.filters = [new filters.AlphaFilter(0.2)]

      const maxBar = options.bar.principal.width || options.width * options.size
      const maxHp = sprite.base?.life.maxHP
      const hp = sprite.base?.life.HP as number
      const maxNodeBar = maxBar / (maxHp as number)
      const barValue = maxNodeBar * (hp as number)

      const barBackground = new Graphics() as CriticalTokenGraphics
      barBackground.beginFill(
        typeof options.bar.principal.color === 'string'
          ? Number(options.bar.principal.color)
          : options.bar.principal.color
      )
      barBackground.drawRect(
        0,
        0,
        barValue,
        options.bar.principal.height || (options.width * options.size) / 4
      )
      barBackground.endFill()

      const barText = new Text(
        `${hp}/${maxHp}`,
        new TextStyle({
          fontFamily: 'Poppins',
          fontSize: 12 + options.size * 4
        })
      )

      barText.x += barBackgroundAlpha.width / 2 - barText.width / 2
      barText.y += barBackgroundAlpha.height / 2 - barText.height / 2
      barText.filters = [new filters.FXAAFilter()]

      bar.addChild(barBackgroundAlpha)
      bar.addChild(barBackground)
      bar.addChild(barText)

      token.addChild(bar)

      bar.y -=
        options.node / 4 + (options.bar.principal.heightSpacement as number) ||
        (options.width * options.size) / 4
      bar.x += (options.bar.principal.widthSpacement as number) || 0

      token.bar = bar
    }

    select.lineStyle(2, 0xffffff)
    select.drawRect(
      0,
      0,
      options.width * options.size,
      options.height * options.size
    )
    select.endFill()
    const tl = GSAP.timeline({ repeat: -1 })
    tl.to(select.filters[0], { alpha: 0.5, duration: 1, ease: Expo.easeOut })
    tl.to(select.filters[0], { alpha: 0, duration: 1, ease: Expo.easeIn })

    token.addChild(sprite as ObjectRender)
    token.addChild(border)

    token.addChild(actionCancel)

    token.addChild(select)
    token.sprite = sprite as ObjectRender
    token.utils = {
      cancel: actionCancel,
      select
    }

    options.stage.addChild(token)

    logger.emit('Create new token', 'success')

    return token
  }

  return { create }
}
