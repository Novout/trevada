<template>
  <section class="campaigns">
    <section v-if="!loading" class="campaigns__container">
      <section class="campaigns__container__master">
        <h2 class="campaigns__container--title">
          {{ t('profile.campaigns.default') }}
        </h2>
        <button @click.prevent="onCreateCampaign()">
          <font-awesome-icon icon="plus" />
        </button>
      </section>
      <section v-if="user.campaigns.length !== 0" class="campaigns__items">
        <section
          v-for="(campaign, index) in user.campaigns"
          :key="index"
          class="campaigns__container--data"
        >
          <img src="@/assets/logo.png" width="200" alt="test" />
          <p>{{ campaign.name }}</p>
          <section class="campaigns__items__options">
            <button @click.prevent="onConfigurationCampaign(campaign)">
              <font-awesome-icon icon="cog" />
            </button>
            <button @click.prevent="onDeleteCampaign(campaign)">
              <font-awesome-icon icon="archive" />
            </button>
            <button @click.prevent="onToCampaign(campaign)">
              <font-awesome-icon icon="sign-in-alt" />
            </button>
          </section>
        </section>
      </section>
      <section v-else class="campaigns__clean">
        <p>{{ t('profile.campaigns.null') }}</p>
      </section>
    </section>
    <ProfileLoading v-else />
  </section>
  <ProfileCampaignsCreate
    @onComplete="modal.createCampaign = false"
    v-if="modal.createCampaign"
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSession } from '@/store/session'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useServices } from '@/use/services'
import { LoginResponse } from '@/http/content'
import ProfileCampaignsCreate from '@/components/profile/ProfileCampaignsCreate.vue'
import ProfileLoading from '@/components/loading/ProfileLoading.vue'

export default defineComponent({
  components: {
    ProfileLoading,
    ProfileCampaignsCreate
  },
  setup() {
    const session = useSession()
    const router = useRouter()
    const { t } = useI18n()
    const toast = useToast()
    const user = computed(() => session.user)
    const loading = ref(user.value ? false : true)
    const modal = reactive({
      createCampaign: false
    })

    watch(user, (_user) => {
      if (_user) {
        loading.value = false
      }
    })

    const onConfigurationCampaign = (campaign: any) => {}

    const onDeleteCampaign = (campaign: any) => {
      useServices()
        .campaigns()
        .delete({ id: campaign.id })
        .then((res: any) => {
          const result = (user.value as LoginResponse).campaigns.filter(
            (c: any) => {
              return c.id !== campaign.id
            }
          )
          ;(user.value as LoginResponse).campaigns = result

          toast.success(t('generics.toast.delete'))
        })
    }

    const onToCampaign = (campaign: any) => {
      if (
        campaign.activated ||
        (user.value as LoginResponse).user.id === campaign.id_gm
      ) {
        // TODO: Request backend to active campaign
        session.campaign = campaign
        router.push('/campaign')
      }
    }

    const onCreateCampaign = () => {
      modal.createCampaign = true
    }

    return {
      modal,
      user,
      t,
      loading,
      onCreateCampaign,
      onConfigurationCampaign,
      onDeleteCampaign,
      onToCampaign
    }
  }
})
</script>

<style lang="scss" scoped>
.campaigns {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include full-w;
  padding-top: 2rem;
  .campaigns__container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 70%;
    @include shadow-large;
    @include spacement('padding', 1);
    overflow-x: auto;
    .campaigns__container__master {
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        @include button;
        svg {
          @include font('xl');
        }
        background: none;
        border: none;
        margin-left: 1rem;
      }
    }
    .campaigns__container--title {
      @include font('xl');
      border-bottom: 2px solid $color-primary;
    }
    .campaigns__items {
      display: flex;
      .campaigns__container--data {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        width: 200px;
        margin: 0 2rem;
        @include spacement('padding', 2);
        @include animation-ease(200ms);
        &:hover {
          background-color: rgba(255, 255, 255, 0.025);
        }
        &:not(:hover) {
          p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            max-width: 200px;
          }
        }
        p {
          margin: 1rem 0;
        }
      }
      .campaigns__items__options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include full-w;
        button {
          @include button;
          @include svg-color;
          background: none;
          border: none;
        }
      }
    }
    .campaigns__clean {
      height: 50px;
      margin: 2rem 0;
    }
  }
}
</style>
