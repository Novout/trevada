<template>
  <header class="header">
    <section @click.prevent="router.push('/')" class="header__logo">
      <img :src="require('@/assets/logo.png')" alt="" width="150" />
      <h1>Critical</h1>
      <h2>VTT</h2>
    </section>
    <section class="header__language">
      <p
        @click="switchLanguage('en')"
        :style="{
          borderBottom: locale === 'en' ? '1px solid #135CA6' : ''
        }"
      >
        {{ t('home.lang.en') }}
      </p>
      <p
        @click="switchLanguage('pt_BR')"
        :style="{
          borderBottom: locale === 'pt_BR' ? '1px solid #135CA6' : ''
        }"
      >
        {{ t('home.lang.pt_BR') }}
      </p>
    </section>
    <section @click.prevent="logout" class="header__exit">
      {{ t('profile.exit') }}
    </section>
  </header>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '@/store/session'

export default defineComponent({
  emits: ['value'],
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()
    const session = useSession()

    const switchLanguage = (lang: string) => {
      locale.value = lang
    }

    const logout = () => {
      localStorage.removeItem('userContent')
      session.userContent = false
      session.user = false
      router.push('/')
    }

    return { logout, t, router, locale, switchLanguage }
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
      @include font('4x');
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
  .header__exit {
    @include button;
    margin: 0 2rem;
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
