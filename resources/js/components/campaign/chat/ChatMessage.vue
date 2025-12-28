<template>
  <section class="message">
    <input
      @click="token.controlChatMessage = true"
      @blur="token.controlChatMessage = false"
      @keypress.enter="onEmitMessage"
      type="text"
      v-model="message"
    />
    <section>
      <button>
        <font-awesome-icon icon="align-justify" />
      </button>
      <button @click.prevent="onEmitMessage">
        <font-awesome-icon icon="comment" />
      </button>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useContext } from '@/store/context'

export default defineComponent({
  emits: ['onMessage'],
  setup(_, { emit }) {
    const context = useContext()
    const message = ref('')
    const onEmitMessage = (event: Event) => {
      emit('onMessage', message.value)
      message.value = ''
      context.token.controlChatMessage = false
      // @ts-ignore
      document.activeElement.blur()
    }

    return { message, onEmitMessage, token: computed(() => context.token) }
  }
})
</script>

<style lang="scss" scoped>
.message {
  margin-top: 1rem;
  @include full-w;
  input {
    @include shadow;
    @include full-w;
    @include bg($campaign-background-border);
    @include spacement('padding', 2);
    caret-color: $color-secondary;
    border: none;
  }
  section {
    @include font('lg');
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 0.25rem;
    :last-child {
      margin: 0 !important;
    }
    button {
      @include button;
      @include bg($color-black);
      @include spacement('padding', 1);
      @include shadow;
      margin: 0 1rem;
      border: none;
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }
}
</style>
