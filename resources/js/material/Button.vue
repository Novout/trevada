<template>
  <button @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onClick'],
  setup(_, { emit }) {
    const onClick = () => {
      emit('onClick')
    }

    return { onClick }
  }
})
</script>

<style lang="scss" scoped>
.button {
  @include button;
  @include bg(none);
  @include spacement('padding', 1);
  border: 1px solid $color-primary;
}
</style>
