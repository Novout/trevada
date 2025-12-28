<template>
  <ModalData v-if="emitter.modal === 'resource'">
    <template v-slot:header>
      <ModalHeader />
    </template>
    <template v-slot:content>
      <p>test</p>
    </template>
  </ModalData>
  <ModalData v-else-if="emitter.modal === 'token'">
    <template v-slot:header>
      <ModalHeader />
    </template>
    <template v-slot:content>
      <p>test</p>
    </template>
  </ModalData>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEmitter } from '@/store/emitter'
import ModalData from '@/components/material/modal/ModalData.vue'
import ModalHeader from '@/components/material/modal/ModalHeader.vue'

export default defineComponent({
  components: {
    ModalData,
    ModalHeader
  },
  setup() {
    const emitter = useEmitter()

    return { emitter }
  }
})
</script>
