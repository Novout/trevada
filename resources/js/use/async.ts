import { defineAsyncComponent } from 'vue'

export const useAsync = () => {
  const LandingRouteAsync = () => import('@/pages/index.vue')

  const InteractiveAsync = defineAsyncComponent(() =>
    import('@/components/landing/Interactive.vue')
  )

  const CampaignAsync = defineAsyncComponent(() => import('@/components/campaign/Canvas.vue'))

  return { InteractiveAsync, LandingRouteAsync, CampaignAsync }
}
