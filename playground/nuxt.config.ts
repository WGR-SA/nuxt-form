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
    default_styles: true,
    messages: {
    }
  }
})
