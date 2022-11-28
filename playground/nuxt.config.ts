import { defineNuxtConfig } from 'nuxt/config'
import NuxtForm from '..'

export default defineNuxtConfig({
  modules: [
    NuxtForm
  ],
  debug: true,
  runtimeConfig: {
    public: {
      recaptchaSitekey: ''
    }
  },
  form: {
    recaptcha: true
  }
})
