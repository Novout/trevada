<template>
  <section class="header">
    <button @click.prevent="emitter.modal = 'none'">
      <font-awesome-icon icon="times" />
    </button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmitter } from '@/store/emitter'

export default defineComponent({
  setup() {
    const emitter = useEmitter()

    return { emitter }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid $color-secondary;
  @include full-w;
  @include spacement('padding', 3);
  button {
    @include button;
    @include svg-hover;
    border: none;
    background: none;
    svg {
      @include font('xl');
    }
  }
}
</style>
