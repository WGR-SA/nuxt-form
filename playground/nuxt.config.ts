import { defineNuxtConfig } from 'nuxt'
import NuxtForm from '..'

export default defineNuxtConfig({
  modules: [
    NuxtForm
  ],
  myModule: {
    addPlugin: true
  }
})
