<template>
  <div class="input">
    <label v-if="label" :for="props.for">
      {{ label }}
    </label>
    <input :type="props.type" :value="props.modelValue" @input="update" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    for: {
      type: String
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  setup(props, { emit }) {
    const update = (event: any) => {
      emit('update:modelValue', event.target.value)
    }

    return { props, update }
  }
})
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  @include full-w;
  @include bg($campaign-background);
  @include spacement('padding', 2);
  label {
    @include font('md');
  }
  input {
    @include font('md');
    @include text($color-primary);
    @include bg(none);
  }
}
</style>
