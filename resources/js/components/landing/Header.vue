<template>
  <header class="header">
    <section @click="switchTable(true)" class="header__logo">
      <img :src="require('@/assets/logo.png')" alt="" width="100" />
      <h1>Critical</h1>
      <h2>VTT</h2>
    </section>
    <section class="header__language">
      <p
        @click="switchLanguage('en')"
        :style="{
          borderBottom: locale === 'en' ? '1px solid #161616' : ''
        }"
      >
        {{ t('home.lang.en') }}
      </p>
      <p
        @click="switchLanguage('pt_BR')"
        :style="{
          borderBottom: locale === 'pt_BR' ? '1px solid #161616' : ''
        }"
      >
        {{ t('home.lang.pt_BR') }}
      </p>
    </section>
    <section v-if="!user" @click="switchTable(false)" class="header__login">
      <p>{{ t('home.login') }}</p>
      <font-awesome-icon icon="door-open" size="6x" />
    </section>
    <section v-else @click="router.push('/profile')" class="header__login">
      <p>{{ t('home.logged') }}</p>
      <font-awesome-icon icon="user" size="6x" />
    </section>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useSession } from '@/store/session'

export default defineComponent({
  emits: ['value'],
  setup(props, { emit }) {
    const { t, locale } = useI18n()
    const session = useSession()
    const router = useRouter()

    const switchLanguage = (lang: string) => {
      locale.value = lang
    }

    const switchTable = (_table: boolean) => {
      emit('value', _table)
    }

    return {
      user: computed(() => session.user),
      router,
      t,
      locale,
      switchLanguage,
      switchTable
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @include full-w;
  @include spacement('padding', 1);
  .header__logo {
    @include priority;
    @include button;
    display: flex;
    align-items: center;
    h1 {
      font-weight: 700;
    }
    h2 {
      margin-left: 0.5rem;
    }
    :is(h1, h2) {
      font-size: 2.5rem;
      pointer-events: none;
    }
  }
  .header__language {
    @include center('row');
    margin: 0 2rem;
    * {
      margin: 0 1rem;
      @include button;
      color: $color-white;
      font-size: 0.9rem;
    }
  }
  .header__login {
    @include center('row');
    @include spacement('margin', 1);
    @include spacement('padding', 1);
    @include button;
    border-radius: 0.5rem;
    p {
      font-weight: 700;
    }
    svg {
      cursor: pointer;
    }
    :is(p, svg) {
      margin: 0 0.25rem;
      font-size: 1.5rem;
    }
  }

  @include mobile {
    .header__language {
      margin: 0 0.5rem;
    }
    .header__language > * {
      font-size: 0.8rem;
    }
  }

  @include tablet {
    .header__logo > img {
      display: none;
    }
    .header__logo > :is(h1, h2) {
      font-size: 1.5rem;
    }
    .header__login > p {
      display: none;
    }
  }
}
</style>
