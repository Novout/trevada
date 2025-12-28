<template>
  <main id="interactive" />
</template>

<script>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
} from 'vue'
import { useCanvas } from '@/use/canvas/canvas'
import { useCampaign } from '@/store/campaign/campaign'

export default defineComponent({
  setup() {
    const canvas = useCanvas()
    const campaign = useCampaign

    onMounted(() => {
      canvas.init()
      campaign.exists = true
    })

    onBeforeUnmount(() => {
      canvas.destroy()
      campaign.exists = false
    })
  }
})
</script>

<style lang="scss" scoped>
#interactive {
  min-height: 100vh;
  width: 100%;
  @include bg($color-white);
  padding: 0;
}
</style>
