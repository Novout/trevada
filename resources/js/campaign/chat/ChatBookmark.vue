<template>
  <section class="bookmark">
    <section class="bookmark__utils">
      <h2>{{ t('campaign.chat.bookmark.plugins') }}</h2>
    </section>
    <section class="bookmark__plugins">
      <ModalList name="D&D 5e" key="d&d5e">
        <p>TODO: Load plugins in .json</p>
      </ModalList>
    </section>
    <section class="bookmark__utils">
      <h2>{{ t('campaign.chat.bookmark.resource') }}</h2>
      <section @click.prevent="onResource">
        <font-awesome-icon icon="plus-square" />
      </section>
    </section>
    <section class="bookmark__list">
      <chat-bookmark-resource
        v-for="(resource, index) in resources"
        :key="index"
        :alt="resource.alt"
        :title="resource.title"
        :src="resource.src"
      />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Expo } from 'gsap'
import { useAnimation } from '@/use/animation'
import { useContext } from '@/store/context'
import { useEmitter } from '@/store/emitter'
import ChatBookmarkResource from '@/components/campaign/chat/bookmark/ChatBookmarkResource.vue'
import ModalList from '@/components/material/ModalList.vue'

export default defineComponent({
  components: {
    ChatBookmarkResource,
    ModalList
  },
  setup() {
    const { t } = useI18n()
    const context = useContext()
    const emitter = useEmitter()
    const resources = ref([
      {
        title: 'Foo',
        alt: 'Foo',
        src: '../../assets/logo.png'
      }
    ])

    useAnimation().appear([
      [
        '.bookmark',
        { opacity: 1, duration: 1, ease: Expo.easeOut },
        'define+=0.25'
      ]
    ])

    const onResource = () => {
      emitter.modal = 'resource'
    }
    const onContent = () => {}

    return { context, t, resources, onResource, onContent }
  }
})
</script>

<style lang="scss" scoped>
.bookmark {
  height: 70vh;
  position: relative;
  top: 3rem;
  @include full-w;
  margin-top: 1rem;
  overflow-y: auto;
  * > svg {
    @include button;
    @include font('xl');
    @include svg-hover;
  }
  .bookmark__utils {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include full-w;
    @include aside-title;
    h2 {
      font-weight: 700;
      @include font('xl');
    }
  }
  .bookmark__plugins {
    @include full-w;
  }
  .bookmark__list {
    @include full-w;
  }
}
</style>
