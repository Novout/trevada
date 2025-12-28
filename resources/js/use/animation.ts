import GSAP from 'gsap'
import { onMounted, onUnmounted } from 'vue'

export const useAnimation = () => {
  const appear = (options: Array<Array<gsap.TweenVars | string>>) => {
    onMounted(() => {
      options.forEach((option) => {
        const tl = GSAP.timeline()
        tl.to(
          option[0] as string,
          option[1] as gsap.TweenVars,
          option[2] as gsap.Position
        )
      })
    })
  }

  const disappear = (options: Array<Array<gsap.TweenVars | string>>) => {
    onUnmounted(() => {
      options.forEach((option) => {
        const tl = GSAP.timeline()
        tl.to(
          option[0] as string,
          option[1] as gsap.TweenVars,
          option[2] as gsap.Position
        )
      })
    })
  }

  return { appear, disappear }
}
