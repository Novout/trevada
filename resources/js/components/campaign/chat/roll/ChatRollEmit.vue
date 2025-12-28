<template>
  <section class="item">
    <p
      class="content content__name"
      :style="{ color: props.content.user.color }"
    >
      {{ props.content.user.name + ` (${props.content.user.type}):` }}
    </p>
    <p class="content" v-if="props.content.user.roll">
      {{ roll }}
    </p>
  </section>
  <section class="dices">
    <article v-for="(dice, index) in props.content.user.dices" :key="index">
      <p
        :style="{
          left:
            dice[1] >= 10 ? (dice[1] >= 100 ? '0.1rem' : '0.55rem') : '1rem',
          color:
            dice[0] === dice[1]
              ? 'green !important'
              : dice[1] === 1
              ? 'red !important'
              : dice[1] <= 0
              ? 'purple !important'
              : ''
        }"
      >
        {{ dice[1] }}
      </p>
      <font-awesome-icon icon="dice-d6" />
    </article>
  </section>
  <section class="result">
    <p class="result">{{ `= ${props.content.result}` }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: ['content'],
  setup(props) {
    const roll = ref('')

    // TODO: 1 and 20 animation with watcher
    // @ts-ignore
    for (let [key, value] of props.content.user.roll.entries()) {
      if (key.includes('dice') && roll.value === '')
        roll.value += `\t${value[0]}d${value[1]}\t`
      else if (key.includes('dice'))
        roll.value += key.includes('negative')
          ? `-\t${value[0]}d${Math.abs(value[1])}\t`
          : `+\t${value[0]}d${value[1]}\t`
    }
    // @ts-ignore
    for (let [key, value] of props.content.user.roll.entries()) {
      if (key.includes('increment')) roll.value += `+\t${value}\t`
      else if (key.includes('decrement')) roll.value += `-\t${value}\t`
    }

    /*
     vue 3 not works this... kekw
    const colorInstance = computed((dice: Array<number>) => {
      if(dice[0] === dice[1]) return 'green !important'
      if(dice[1] === 1) return 'red !important'
      if(dice[1] <= 0) return 'brown !important'

      return ''
    })
    */

    return { props, roll }
  }
})
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  @include bg(rgba(255, 255, 255, 0.05));
  @include text($color-secondary);
  @include spacement('padding', 1);
  p {
    @include font('lg');
    pointer-events: none;
  }
  .content {
    &:last-child {
      @include shadow;
      @include bg($campaign-background-border);
      padding: 0 1rem;
    }
  }
  .content__name {
    font-weight: 700;
  }
}
.dices {
  overflow-x: auto;
  display: flex;
  align-items: center;
  @include full-w;
  box-shadow: none;
  @include spacement('padding', 1);
  article {
    display: flex;
    align-items: center;
    box-shadow: none;
    margin: 0 0.5rem;
    p {
      position: relative;
      width: 10px;
      @include text($color-primary);
      @include font('xl');
      font-weight: 700;
    }
    svg {
      @include font('2x');
      opacity: 0.1;
    }
  }
}
.result {
  @include font('xl');
  padding: 0.25rem;
}
</style>
