<template>
  <ModalOverflow>
    <Input label="Insert Name" v-model="data.name" for="name" />
    <Button @onClick="onEmit">Test</Button>
  </ModalOverflow>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useServices } from '@/use/services'
import { useToast } from 'vue-toastification'
import { useSession } from '@/store/session'
import { LoginResponse } from '@/http/content'
import ModalOverflow from '@/components/material/modal/ModalOverflow.vue'
import Input from '@/components/material/Input.vue'
import Button from '@/components/material/Button.vue'

export default defineComponent({
  emits: ['onComplete'],
  components: {
    ModalOverflow,
    Input,
    Button
  },
  setup(_, { emit }) {
    const toast = useToast()
    const data = reactive({
      name: 'DASDSADSA' as string
    })
    const session = useSession()
    const { t } = useI18n()

    const onEmit = () => {
      useServices()
        .campaigns()
        .create({
          name: `${(session.user as LoginResponse).user.name}: ${data.name}`
        })
        .then((res: any) => {
          ;(session.user as LoginResponse).campaigns.push(res.data.campaign)
          toast.success(t('generics.toast.success'))
        })
        .catch((res: any) => {
          toast.error('KEKW')
        })
        .finally(() => {
          emit('onComplete')
        })
    }

    return { data, onEmit }
  }
})
</script>
