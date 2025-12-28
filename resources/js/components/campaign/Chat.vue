<template>
  <aside id="chat">
    <section class="chat__bar">
      <chat-bar @click="render = 'roll'" icon="dice-d20" />
      <chat-bar @click="render = 'book'" icon="book-open" />
      <chat-bar @click="render = 'control'" icon="compress-arrows-alt" />
      <div class="__bar"></div>
    </section>
    <ChatRoll v-if="render === 'roll'" />
    <ChatBookmark v-else-if="render === 'book'" />
    <ChatControl v-else-if="render === 'control'" />
    <ChatMessage id="message" @onMessage="onMessage" />
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import GSAP, { Expo } from 'gsap'
import { useAnimation } from '@/use/animation'
import { useContext } from '@/store/context'
import { useRoll } from '@/use/roll'
import ChatBar from '@/components/campaign/chat/ChatBar.vue'
import ChatRoll from '@/components/campaign/chat/ChatRoll.vue'
import ChatBookmark from '@/components/campaign/chat/ChatBookmark.vue'
import ChatControl from '@/components/campaign/chat/ChatControl.vue'
import ChatMessage from '@/components/campaign/chat/ChatMessage.vue'

export default defineComponent({
  components: {
    ChatBar,
    ChatRoll,
    ChatBookmark,
    ChatControl,
    ChatMessage
  },
  setup() {
    const context = useContext()
    const render = ref('roll')

    useAnimation().appear([
      ['#chat', { right: 0, duration: 1, ease: Expo.easeOut }, 'define'],
      [
        '.chat__bar',
        { opacity: 1, y: 30, duration: 1, ease: Expo.easeOut },
        'define+=0.4'
      ],
      [
        '#message',
        { opacity: 1, duration: 1, ease: Expo.easeOut },
        'define+=0.6'
      ]
    ])

    watch(render, (_render, prev) => {
      const tl = GSAP.timeline()
      const value = 105

      if (_render === prev) return

      if (
        (prev === 'roll' && _render === 'book') ||
        (prev === 'control' && _render === 'book')
      )
        tl.to('.__bar', { x: value + 20, duration: 1, ease: Expo.easeOut })
      else if (
        (prev === 'book' && _render === 'roll') ||
        (prev === 'control' && _render === 'roll')
      )
        tl.to('.__bar', { x: 15, duration: 1, ease: Expo.easeOut })
      else if (
        (prev === 'book' && _render === 'control') ||
        (prev === 'roll' && _render === 'control')
      )
        tl.to('.__bar', { x: value * 2 + 30, duration: 1, ease: Expo.easeOut })
    })

    const onMessage = async (message: string) => {
      if (message.includes('/r') || message.includes('/roll')) {
        await useRoll().emit(message)
      }
    }

    return { render, onMessage }
  }
})
</script>

<style lang="scss" scoped>
#chat {
  position: fixed;
  top: 0;
  right: -30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: $campaign-chat-width;
  height: 100vh;
  @include bg($campaign-background);
  @include spacement('padding', 2);
  section {
    @include spacement('padding', 1);
    opacity: 0;
    transform: translateY(-30px);
    div {
      @include bg($color-primary);
      width: 5rem;
      height: 2px;
      transform: translateX(10px);
    }
  }
}
</style>
