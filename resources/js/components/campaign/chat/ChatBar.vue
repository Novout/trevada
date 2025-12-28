<template>
  <button class="item">
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['icon'],
  setup() {}
})
</script>

<style lang="scss" scoped>
.item {
  @include button;
  @include spacement('padding', 1);
  @include svg-hover;
  margin: 0 2rem;
  background: none;
  border: none;
  svg {
    @include font('2x');
  }
}
</style>
