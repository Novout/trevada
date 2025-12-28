<template>
  <section class="principal">
    <section class="principal__container">
      <section
        @mouseover="alterate.image = true"
        @mouseleave="alterate.image = false"
        class="principal__container--input"
      >
        <input
          @change="onImageLoad"
          v-if="alterate.image"
          id="profile"
          type="file"
        />
        <label v-if="alterate.image" for="profile">Input</label>
        <img id="profile-img" src="@/assets/logo.png" width="300" alt="test" />
      </section>
      <section v-if="!loading" class="principal__container--data">
        <h2>{{ t('profile.user.name') }}</h2>
        <p>{{ user?.user?.name }}</p>
        <h2>{{ t('profile.user.email') }}</h2>
        <p>{{ user?.user?.email }}</p>
        <h2>{{ t('profile.user.vip.default') }}</h2>
        <p>
          {{
            user?.user?.is_vip
              ? t('profile.user.vip.yes')
              : t('profile.user.vip.no')
          }}
        </p>
        <h2>{{ t('profile.user.created') }}</h2>
        <p>{{ user?.user?.created_at }}</p>
      </section>
      <ProfileLoading v-else />
    </section>
  </section>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useSession } from '@/store/session'
import ProfileLoading from '@/components/loading/ProfileLoading.vue'
import { useConverter } from '@/use/converter'
import { useServices } from '@/use/services'

export default defineComponent({
  components: {
    ProfileLoading
  },
  setup() {
    const session = useSession()
    const toast = useToast()
    const user = computed(() => session.user)
    const { t } = useI18n()
    const loading = ref(user.value ? false : true)
    const alterate = reactive({
      image: false
    })

    watch(user, (_user) => {
      if (_user) {
        loading.value = false
      }
    })

    const onImageLoad = (event: any) => {
      useConverter()
        .base64(event.target)
        .then((res: string) => {
          ;(document.getElementById('profile-img') as any).src = res

          useServices()
            .auth()
            .image({
              image: (document.getElementById('profile') as any).value
            })
            .then((res: any) => {
              toast.success('EOQ')
            })
        })
    }

    return { user, alterate, t, loading, onImageLoad }
  }
})
</script>

<style lang="scss" scoped>
.principal {
  display: flex;
  align-items: center;
  justify-content: center;
  @include full-w;
  .principal__container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    @include shadow-large;
    @include spacement('padding', 2);
    .principal__container--input {
      position: relative;
      border: 1px solid red;
      width: 300px;
      height: 300px;
      input[type='file'] {
        display: none;
      }
      label {
        @include absolute-center;
        @include bg($color-primary);
        border-radius: 0.5rem;
        color: #fff;
        cursor: pointer;
        padding: 0.5rem 1rem;
      }
      img {
        border: 1px solid $color-primary;
        @include shadow-large;
      }
    }
    .principal__container--data {
      h2 {
        @include font('lg');
        border-bottom: 1px solid $color-primary;
      }
    }
    @include tablet {
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
