import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

export interface ModuleOptions {
  recaptchaSiteKey: string | null
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-form',
    configKey: 'nuxtForm'
  },
  defaults: {
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY ?? null
  },
  setup (inlineOptions, nuxt) {
    nuxt.options.publicRuntimeConfig.nuxtForm = inlineOptions

    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'FormBuilder',
      filePath: resolver.resolve('./runtime/components/FormBuilder')
    })
  }
})
