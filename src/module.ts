import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-form',
    configKey: 'nuxtForm'
  },
  setup () {
    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'FormBuilder',
      filePath: resolver.resolve('./runtime/components/FormBuilder')
    })
  }
})
