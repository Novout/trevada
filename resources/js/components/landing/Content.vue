<template>
  <section class="interactive">
    <h2>{{ t('home.interactive.title') }}</h2>
    <p>{{ t('home.interactive.description') }}</p>
    <Suspense>
      <template #default>
        <InteractiveAsync />
      </template>
      <template #fallback>
        <InteractiveLoading />
      </template>
    </Suspense>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAsync } from '@/use/async'
import InteractiveLoading from '@/components/loading/InteractiveLoading.vue'
const { InteractiveAsync }: any = useAsync()

export default defineComponent({
  props: {
    table: Boolean
  },
  setup() {
    const { t, locale } = useI18n()

    const switchLanguage = (lang: string) => {
      locale.value = lang
    }

    return { t, locale, switchLanguage }
  },
  components: {
    InteractiveAsync,
    InteractiveLoading
  }
})
</script>

<style lang="scss" scoped>
.interactive {
  @include center('column');
  @include spacement('padding', 2);
  h2 {
    font-weight: 700;
    font-size: 2.5rem;
  }
  p {
    font-family: 'Lato', sans-serif;
    margin-top: 1rem;
  }
  main {
    margin-top: 2rem;
  }
  @include tablet {
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.85rem;
    }
  }
}
</style>
