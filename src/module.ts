import { fileURLToPath } from 'url'
import { defineNuxtModule, createResolver, addPlugin, addImports, addComponent } from '@nuxt/kit'

import type { ModuleOptions } from './types'
export * from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@wgr-sa/nuxt-form',
    configKey: 'form'
  },
  defaults: {
    recaptcha: true
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.runtimeConfig.public.form = options

    if (options.recaptcha) {
      addPlugin(resolve(runtimeDir, 'plugins', 'recaptcha'))
    }

    addComponent({
      name: 'FormBuilder',
      filePath: resolve(runtimeDir, 'components', 'FormBuilder.vue')
    })

    addComponent({
      name: 'FormInput',
      filePath: resolve(runtimeDir, 'components', 'FormInput.vue')
    })

    addComponent({
      name: 'FormInputContainer',
      filePath: resolve(runtimeDir, 'components', 'FormInput.vue')
    })

    addComponent({
      name: 'FormAlert',
      filePath: resolve(runtimeDir, 'components', 'FormAlert.vue')
    })

    addImports({
      name: 'useFormBuilder',
      from: resolve(runtimeDir, 'composable', 'builder.ts')
    })

    addImports({
      name: 'useFormData',
      from: resolve(runtimeDir, 'composable', 'data.ts')
    })
  }
})
