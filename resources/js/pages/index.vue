<script setup lang="ts">
import Layout from '../layouts/default.vue'
import { ref } from 'vue'
import Content from '@/components/landing/Content.vue'
import Header from '@/components/landing/Header.vue'
import Auth from '@/components/landing/Auth.vue'

const table = ref(true)

const onValue = (value: boolean) => {
  table.value = value
}

defineOptions({ layout: Layout })
</script>

<template>
  <div>
    <Header @value="onValue" />
    <Content v-if="table" />
    <Auth v-else />
  </div>
</template>
