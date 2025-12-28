import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export const useCampaign = defineStore({
  id: 'campaign-define',
  state: () => ({
    t: useI18n().t,
    exists: false as boolean,
    instance: '' as string, // Scene for owner render
    view: '' as string, // Scene for players render
    tokensTexture: []
  }),
  actions: {
    create() {
      this.exists = true
    },
    setView(key: string) {
      this.view = key
    },
    destroyScene(key: string) {
      const toast = useToast()

      if (key === this.view) {
        toast.warning(this.t('campaign.preview.deleteWrongScene'))
        return
      }
      /* TODO: Request to backend dele specific scene */
    },
    async load() {},
    reset() {
      this.exists = false
    },
    getTokensTexture() {
      return this.tokensTexture
    },
    destroy() {
      this.reset()
    }
  }
})
