<template>
  <section
    class="preview"
    :style="{ border: instance === props.preview.title ? '2px solid red' : '' }"
  >
    <img
      @click="onSelect"
      :src="props.preview.image"
      :alt="props.preview.title"
      width="160"
    />
    <div></div>
    <h2>{{ props.preview.title }}</h2>
    <section>
      <context-preview-utils
        icon="flag"
        @onView="onFlagView"
        :flag="props.preview.title"
      />
      <context-preview-utils icon="trash" :flag="props.preview.title" />
      <context-preview-utils icon="cog" :flag="props.preview.title" />
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ContextPreviewUtils from '@/components/campaign/context/ContextPreviewUtils.vue'
import { useCampaign } from '@/store/campaign/campaign'

export default defineComponent({
  components: {
    ContextPreviewUtils
  },
  props: ['preview'],
  emits: ['onSelect'],
  setup(props, { emit }) {
    const campaign = useCampaign()

    const onSelect = () => {
      emit('onSelect', props.preview.title)
    }

    const onFlagView = (key: string) => {
      campaign.setView(key)
    }

    return {
      props,
      onSelect,
      onFlagView,
      instance: computed(() => campaign.instance)
    }
  }
})
</script>

<style lang="scss" scoped>
.preview {
  @include shadow;
  height: 10rem;
  width: 10rem;
  border: 1px solid $campaign-background-border;
  margin-right: 3rem;
  img {
    @include button;
    object-fit: cover;
  }
  div {
    @include full-w;
    @include bg($color-primary);
    height: 1px;
  }
  h2 {
    color: $color-text;
  }
  section {
    display: flex;
    flex-direction: column;
    position: relative;
    left: 10rem;
    bottom: calc(10rem + 2rem + 0.5rem - 1px);
    border: none;
    width: 3rem;
    * {
      @include spacement('padding', 1);
    }
  }
  @include mobile {
    margin-right: 2rem;
  }
}
</style>
