<template>
  <section id="context">
    <context-preview
      @onSelect="onSelect"
      v-for="preview in props.data.scenes"
      :key="preview.title"
      :preview="preview"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCampaign } from '@/store/campaign/campaign'
import { useContext } from '@/store/context'
import ContextPreview from '@/components/campaign/context/ContextPreview.vue'

export default defineComponent({
  props: ['data'],
  components: {
    ContextPreview
  },
  setup(props) {
    const campaign = useCampaign()
    const context = useContext()

    props.data.scenes.forEach((preview: any) => {
      if (preview.instance) {
        campaign.view = preview.title
        campaign.instance = preview.title
      }
    })

    const onSelect = (title: string) => {
      campaign.instance = title

      /* TODO: Request backend map settings */
      props.data.scenes.map((preview: any) => {
        preview.title === title
          ? (preview.instance = true)
          : (preview.instance = false)
      })
      campaign.reset()
      context.reset()
    }

    return { props, onSelect }
  }
})
</script>

<style lang="scss" scoped>
#context {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  height: $campaign-context-height;
  width: 100%;
  overflow-x: auto;
  @include bg($campaign-background);
  @include spacement('padding', 3);
}
</style>
