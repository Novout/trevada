<template>
  <header :style="{ top: state.context ? '15rem' : '' }" id="utils">
    <button @click="onEmit('onChat')">
      <font-awesome-icon icon="dice-d6" />
    </button>
    <button @click="onEmit('onContext')">
      <font-awesome-icon icon="certificate" />
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['state'],
  emits: ['onChat', 'onContext'],
  setup(props, { emit }) {
    const onEmit = (target: string) => emit(target as any)

    return { onEmit, state: props.state }
  }
})
</script>

<style lang="scss" scoped>
#utils {
  position: fixed;
  top: 0;
  right: 30rem;
  button {
    @include bg($campaign-background);
    @include button;
    @include spacement('padding', 2);
    @include text($campaign-white);
    @include shadow;
    margin-right: 2rem;
    border: none;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    @include animation-ease(150ms);
    svg {
      @include font('2x');
    }
    &:where(:hover) {
      @include font('2x');
      @include text($campaign-white-hover);
    }
  }
  @include tablet {
    left: 0;
    right: auto;
  }
}
</style>
