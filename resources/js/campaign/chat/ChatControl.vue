<template>
  <section class="control">
    <section class="control__sprites">
      <h2 v-if="context.group.names().length !== 0">{{ t('campaign.chat.control.token') }}</h2>
      <article v-for="(token, index) in context.group.names()" :key="index">
        <p>{{ token }}</p>
      </article>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { Expo } from 'gsap'
import { useAnimation } from '@/use/animation'
import { useContext } from '@/store/context'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const context = useContext()

    useAnimation().appear([
      [
        '.control',
        { opacity: 1, duration: 1, ease: Expo.easeOut },
        'define+=0.25'
      ]
    ])

    /*
    const on = ref([])

    context.group.names().forEach((name: string) => {
      const token = context.group.get(name)

      if(token.control.players.includes(user)) on.value.push(name)
    })
    */


    return { context, t  }
  }
})
</script>

<style lang="scss" scoped>
.control {
  height: 70vh;
  position: relative;
  top: 3rem;
  margin-top: 1rem;
  overflow-y: auto;
  @include full-w;
  section {
    h2 {
      @include aside-title;
    }
    article {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
      @include bg($campaign-alpha);
      @include full-w;
      @include spacement('padding', 2);
      @include font('md');
      @include button;
      p {
        @include font('lg');
      }
    }
  }
}
</style>
