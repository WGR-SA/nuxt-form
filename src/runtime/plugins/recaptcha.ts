import { defineNuxtPlugin } from '#app'
import { VueReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  if (nuxtApp.$config.public.recaptchaSitekey) {
    nuxtApp.vueApp.use(VueReCaptcha, { siteKey: nuxtApp.$config.public.recaptchaSitekey })
  }
})
