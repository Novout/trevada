<template>
  <article class="rule">
    <h3>{{ props.rule.title }}</h3>
    <p>{{ props.rule.description }}</p>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['rule'],
  setup(props) {
    return { props }
  }
})
</script>

<style lang="scss">
.rule {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  box-shadow: none !important;
  h3 {
    @include text($color-primary);
    @include font('lg');
  }
  p {
    margin-left: 0.5rem;
    margin-top: 0.25rem;
  }
}
</style>
