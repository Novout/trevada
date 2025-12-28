<template>
  <button
    :style="{
      border:
        view === props.flag && props.icon === 'flag' ? '1px solid green' : ''
    }"
    @click.prevent="onEmit"
    class="util"
  >
    <font-awesome-icon :icon="props.icon" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useCampaign } from '@/store/campaign/campaign'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: ['icon', 'flag'],
  emits: ['onView'],
  setup(props, { emit }) {
    const campaign = useCampaign()
    const { t } = useI18n()

    const onEmit = () => {
      if (props.icon === 'trash') {
        if (window.confirm(t('campaign.preview.delete')))
          campaign.destroyScene(props.flag)
      } else if (props.icon === 'flag') emit('onView', props.flag)
    }

    return { props, onEmit, view: computed(() => campaign.view) }
  }
})
</script>

<style lang="scss" scoped>
.util {
  @include bg($color-black);
  @include button;
  width: 2rem;
  height: 2rem;
  margin: 0.25rem 0;
  border: none;
  transition: transform 200ms ease;
  &:hover {
    transform: translateY(-5px);
  }
  svg {
    @include font('sm');
    margin-bottom: 0.3em;
  }
}
</style>
