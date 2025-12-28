<template>
  <section class="banner">
    <section class="banner__logo">
      <img :src="require('@/assets/logo.png')" width="100" />
      <h2>Critical VTT</h2>
    </section>
    <section class="banner__rules">
      <CriticalRollBannerRule
        :rule="{ title: '/r', description: '1d20 + 5' }"
      />
      <CriticalRollBannerRule
        :rule="{
          title: '/m gm',
          description: t('campaign.chat.rules.commandGMMessage')
        }"
      />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CriticalRollBannerRule from '@/components/campaign/chat/roll/ChatRollBannerRule.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  components: {
    CriticalRollBannerRule
  },
  setup() {
    return { t: useI18n().t }
  }
})
</script>

<style lang="scss" scoped>
.banner {
  @include center('column');
  @include full-w;
  @include spacement('padding', 2);
  @include shadow-large;
  .banner__logo {
    @include center('row');
    pointer-events: none;
    h2 {
      @include font('2x');
      font-weight: 700;
    }
  }
  .banner__rules {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;
  }
}
</style>
