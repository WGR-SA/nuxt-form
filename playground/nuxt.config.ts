import { defineNuxtConfig } from 'nuxt/config'
import NuxtForm from '..'

export default defineNuxtConfig({
  modules: [
    NuxtForm
  ],
  runtimeConfig: {
    public: {
      recaptchaSitekey: ''
    }
  },
  form: {
    recaptcha: true,
    hide_recaptcha: false,
    default_styles: true,
    messages: {
    },
    lang: 'fr'
  }
})
