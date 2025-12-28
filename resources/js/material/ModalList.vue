<template>
  <article class="modal">
    <section class="modal__item">
      <h3>{{ props.name }}</h3>
      <section>
        <button @click.prevent="open = true">
          <font-awesome-icon v-if="!open" icon="angle-double-right" />
        </button>
        <button @click.prevent="open = false">
          <font-awesome-icon v-if="open" icon="angle-double-down" />
        </button>
      </section>
    </section>
    <section v-if="open" class="modal__item">
      <slot></slot>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: ['name', 'key'],
  setup(props) {
    const open = ref(false)

    return { props, open }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include full-w;
  @include spacement('padding', 2);
  .modal__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include full-w;
    h3 {
      @include font('lg');
    }
    button {
      @include button;
      @include svg-hover;
      background: none;
      border: none;
      svg {
        @include font('lg');
      }
    }
  }
}
</style>
