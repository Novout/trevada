<template>
  <main id="interactive" />
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, watch } from 'vue'
import { useExample } from '@/use/canvas/example'

export default defineComponent({
  setup() {
    const canvas = useExample()

    onMounted(() => {
      canvas.init({
        width: 500,
        height: 500,
        alpha: true
      })
    })

    onBeforeUnmount(() => {
      canvas.destroy()
    })
  }
})
</script>

<style lang="scss" scoped>
#interactive {
  border: 1px solid $color-primary;
  height: 400px;
  overflow-y: hidden;
}
</style>
