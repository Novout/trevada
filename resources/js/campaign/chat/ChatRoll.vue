<template>
  <section id="roll" class="roll">
    <ChatRollBanner />
    <article v-for="(content, index) in chat" :key="index">
      <ChatRollEmit :content="content" />
    </article>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Expo } from 'gsap'
import { useAnimation } from '@/use/animation'
import { useOptions } from '@/store/campaign/options'
import { useContext } from '@/store/context'
import ChatRollEmit from '@/components/campaign/chat/roll/ChatRollEmit.vue'
import ChatRollBanner from '@/components/campaign/chat/roll/ChatRollBanner.vue'

export default defineComponent({
  components: {
    ChatRollEmit,
    ChatRollBanner
  },
  setup(props) {
    const { t } = useI18n()
    const options = useOptions()
    const context = useContext()

    watch(context.chat, () => {
      setTimeout(() => {
        const roll = document.getElementById('roll')
        // @ts-ignore
        roll.scrollTop = roll.scrollHeight
      }, 0)
    })

    useAnimation().appear([
      ['.roll', { opacity: 1, duration: 1, ease: Expo.easeOut }, 'define+=0.25']
    ])

    return {
      t,
      chat: computed(() => context.chat)
    }
  }
})
</script>

<style lang="scss">
.roll {
  position: relative;
  top: 3rem;
  opacity: 0;
  display: flex;
  flex-direction: column;
  @include spacement('padding', 1);
  @include full-w;
  height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
  article {
    border-radius: 0.25rem;
    margin-top: 1rem;
    @include shadow-large;
  }
  @include tablet-height {
    height: 400px;
  }
  @include mobile-height {
    height: 250px;
  }
}
</style>
