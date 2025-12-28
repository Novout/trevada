<template>
  <main class="auth">
    <form @submit.prevent="onSubmit">
      <header>
        <p
          @click="type = 'login'"
          :style="{ borderBottom: type === 'login' ? '2px solid #6E3DD1' : '' }"
        >
          {{ t('auth.login.name') }}
        </p>
        <p
          @click="type = 'register'"
          :style="{
            borderBottom: type === 'register' ? '2px solid #6E3DD1' : ''
          }"
        >
          {{ t('auth.register.name') }}
        </p>
      </header>
      <section v-if="type === 'login'">
        <label>{{ t('auth.login.email.label') }}</label>
        <input
          type="text"
          autocomplete="email"
          v-model="login.emailLogin"
          :placeholder="t('auth.login.email.placeholder')"
        />
        <label>{{ t('auth.login.password.label') }}</label>
        <input
          type="password"
          autocomplete="current-password"
          v-model="login.passwordLogin"
          :placeholder="t('auth.login.password.placeholder')"
        />
      </section>
      <section v-else>
        <label>{{ t('auth.register.user.label') }}</label>
        <input
          type="text"
          autocomplete="username"
          v-model="register.userRegister"
          :placeholder="t('auth.register.user.placeholder')"
        />
        <label>{{ t('auth.register.email.label') }}</label>
        <input
          type="text"
          autocomplete="email"
          v-model="register.emailRegister"
          :placeholder="t('auth.register.email.placeholder')"
        />
        <label>{{ t('auth.register.password.label') }}</label>
        <input
          type="password"
          autocomplete="current-password"
          v-model="register.passwordRegister"
          :placeholder="t('auth.register.password.placeholder')"
        />
      </section>
      <div>
        <button>{{ t('auth.button') }}</button>
      </div>
    </form>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, nextTick, watch } from 'vue'
import { required, email, maxLength } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useVuelidate } from '@vuelidate/core'
import { useServices } from '@/use/services'
import { useSession } from '@/store/session'
import { LoginResponse, RegisterResponse } from '@/http/content'
export default defineComponent({
  setup() {
    const toast = useToast()
    const router = useRouter()
    const services = useServices()
    const session = useSession()
    const { t } = useI18n()

    const type = ref('login')
    const login = reactive({
      emailLogin: '',
      passwordLogin: ''
    })
    const register = reactive({
      userRegister: '',
      emailRegister: '',
      passwordRegister: ''
    })

    const rules = {
      emailLogin: { required, email },
      passwordLogin: { required },
      userRegister: { required, maxLength: maxLength(20) },
      emailRegister: { required, email },
      passwordRegister: { required }
    }

    const v = useVuelidate(
      rules,
      { ...toRefs(login), ...toRefs(register) },
      { $stopPropagation: true }
    )

    const onSubmit = async () => {
      v.value.$touch()
      await nextTick()

      if (type.value === 'login') {
        const emailInvalid = v.value.emailLogin.$invalid
        const passwordInvalid = v.value.passwordLogin.$invalid

        if (emailInvalid) toast.error(t('auth.toast.emailLogin'))
        if (passwordInvalid) toast.error(t('auth.toast.passwordLogin'))

        if (!emailInvalid && !passwordInvalid) {
          services
            .auth()
            .login({
              email: login.emailLogin,
              password: login.passwordLogin
            })
            .then((res: any) => {
              if (res.status === 200) {
                toast.success(
                  t('auth.toast.successLogin', { user: res.data.user.name })
                )
                localStorage.setItem(
                  'userContent',
                  JSON.stringify({
                    email: login.emailLogin,
                    password: login.passwordLogin
                  })
                )
                session.user = res
                v.value.$reset()
                router.push('/profile')
              }
            })
            .catch((res: any) => {
              toast.error(t('generics.toast.error'))
            })
        }
      } else {
        const userInvalid = v.value.userRegister.$invalid
        const emailInvalid = v.value.emailRegister.$invalid
        const passwordInvalid = v.value.passwordRegister.$invalid

        if (userInvalid) toast.error(t('auth.toast.userRegister'))
        if (emailInvalid) toast.error(t('auth.toast.emailRegister'))
        if (passwordInvalid) toast.error(t('auth.toast.passwordRegister'))

        if (!userInvalid && !emailInvalid && !passwordInvalid) {
          v.value.$reset()
          await nextTick()

          services
            .auth()
            .register({
              name: register.userRegister,
              email: register.emailRegister,
              password: register.passwordRegister,
              preferences: { foo: 'bar' }
            })
            .then((res: RegisterResponse) => {
              if (res.status === 201) {
                toast.success(t('auth.toast.successRegister'))
                type.value = 'login'
              }
            })
            .catch((res: any) => {
              toast.error('Error')
            })
        }
      }
    }

    watch(type, () => {
      login.emailLogin = ''
      login.passwordLogin = ''
      register.userRegister = ''
      register.emailRegister = ''
      register.passwordRegister = ''
      v.value.$reset()
    })

    return { type, login, register, t, v, onSubmit }
  }
})
</script>

<style lang="scss" scoped>
.auth {
  @include center('row');
  margin-top: 5rem;
  form {
    @include center('column');
    @include shadow;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    header {
      display: flex;
      background-color: rgba(255, 255, 255, 0.1);
      justify-content: space-between;
      align-items: center;
      @include full-w;
      min-width: 450px;
      @include spacement('padding', 2);
      * {
        @include button;
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
    section {
      @include full-w;
      @include spacement('padding', 2);
      @include center('column');
      label {
        margin-top: 2rem;
      }
      * {
        color: $color-white;
      }
      input {
        background: none;
        border: none;
        padding: 0.25rem 1rem;
        @include shadow;
        [type='password']::-webkit-input-placeholder {
          transform: scale(2);
          transform-origin: 0 50%;
        }
        ::placeholder {
          color: rgba(255, 255, 255, 0.25);
          font-size: 0.9rem;
        }
      }
    }
    div {
      display: flex;
      @include full-w;
      @include spacement('padding', 1);
      justify-content: flex-end;
      align-items: center;
      margin-top: 2rem;
      button {
        @include button;
        background: none;
        border: none;
        font-size: 1.2rem;
      }
    }
  }
}
</style>
