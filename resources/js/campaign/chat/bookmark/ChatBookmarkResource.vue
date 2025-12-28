<template>
  <section class="resource" @click.prevent="onClick">
    <img :src="props.src" :alt="props.alt" :width="props.width || '30'">
    <h3>{{ props.title }}</h3>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['src', 'alt', 'title', 'width'],
  setup(props) {
    const onClick = () => {}

    return { props, onClick }
  },
})
</script>


<style lang="scss" scoped>
.resource {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include spacement('padding', 2);
  @include full-w;
  @include bg($campaign-alpha);
  @include button;
  margin: 1rem 0;
  h3 {
    @include font('lg');
  }
}
</style>
