import { useToast } from 'vue-toastification'
import { useContext } from '@/store/context'
import i18n from '@/locales'
import { CriticalRollList } from '@/utils'

const normalize = (text: string) => {
  let _text = text
    .toLowerCase()
    .replace('/r ', '')
    .replace('/roll ', '')
  _text += ' '

  return _text
}

export const useRoll = () => {
  const resultTotally: Array<number> = []
  const _dices: Array<Array<number>> = []

  const context = useContext()
  const toast = useToast()
  const { t } = i18n.global

  const roll = (quantity: number, dice: number) => {
    let result = 0

    for (let i = 0; i < quantity; i++) {
      const value = Math.floor(Math.random() * dice) + 1
      const diceValue = [dice, value]
      result += value
      //console.log(diceValue)
      _dices.push(diceValue)
    }

    resultTotally.push(result)

    return result
  }

  const emit = (content: string) => {
    const _content = normalize(content)

    const _roll = new Map()
    let result = 0

    let past = ''
    let pastSignal = '+'

    let isDiceCount = 1
    let isIncrementCount = 1
    let isDecrementCount = 1

    let isDice = false
    let isIncrement = false
    let isDecrement = false

    let accumulator = ''

    const reset = () => {
      isDice = false
      isIncrement = false
      isDecrement = false
      accumulator = ''
      pastSignal = ''
      past = ''
    }

    const set = () => {
      if (isDice) {
        // console.log({ dice: true, past, accumulator, pastSignal })
        _roll.set(
          pastSignal === '+'
            ? `dice${isDiceCount}`
            : `dice${isDiceCount}negative`,
          [
            Number(past),
            pastSignal === '+' ? Number(accumulator) : -Number(accumulator)
          ]
        )
        isDiceCount++
      } else if (isIncrement) {
        if (past !== '') accumulator += past
        // console.log({ increment: true, past, accumulator, pastSignal })
        _roll.set(`increment${isIncrementCount}`, Number(accumulator))
        isIncrementCount++
      } else if (isDecrement) {
        if (past !== '') accumulator += past
        // console.log({ decrement: true, past, accumulator, pastSignal })
        _roll.set(`decrement${isDecrementCount}`, Number(accumulator))
        isDecrementCount++
      }
    }

    for (const c of _content) {
      // console.log({past, accumulator, pastSignal})
      if (past && c !== 'd') {
        if ((isDice || isIncrement || isDecrement) && c !== ' ') {
          accumulator += c
        }
      }

      if (c === 'd') {
        isDice = true
        isIncrement = false
        isDecrement = false
      } else if (c === '+') {
        isIncrement = true
        isDecrement = false
        pastSignal = '+'
      } else if (c === '-') {
        isIncrement = false
        isDecrement = true
        pastSignal = '-'
      } else if (c === ' ') {
        if (
          (accumulator !== '' || past !== '') &&
          (accumulator !== ' ' || past !== '') &&
          pastSignal
        ) {
          set()
          reset()
        }
      }

      if (!isDice && c !== '+' && c !== '-' && c !== ' ') past += c
    }

    // @ts-ignore
    for (let [key, value] of _roll.entries()) {
      let error = false

      if (!Array.isArray(value)) {
        if (isNaN(value)) {
          toast.error(t('campaign.chat.message.error.NaN'))
          error = true
        }
      } else {
        value.forEach((number) => {
          if (isNaN(number)) {
            toast.error(t('campaign.chat.message.error.NaN'))
            error = true
          }
        })
      }

      if (error) return

      if (key.includes('dice')) result += roll(value[0], value[1])
      else if (key.includes('increment')) {
        result += value
        resultTotally.push(value)
      } else if (key.includes('decrement')) {
        result -= value
        resultTotally.push(value)
      }
    }

    context.chat.push({
      user: {
        name: 'Guest',
        type: 'GM',
        color: '#A262E2',
        roll: _roll,
        dices: _dices
      },
      result
    } as CriticalRollList)
  }

  return { emit, roll }
}
