import { defineNuxtModule, createResolver, addImports, addComponent } from '@nuxt/kit'

export default defineNuxtModule<FormModule.options>({
  meta: {
    name: '@wgr-sa/nuxt-form',
    configKey: 'form'
  },
  defaults: {
    recaptcha: true,
    hide_recaptcha: false,
    default_styles: true,
    messages: {},
    lang: 'fr'
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    nuxt.options.build.transpile.push(runtimeDir)
    nuxt.options.runtimeConfig.public.form = options

    if (options.default_styles) {
      nuxt.options.css.push(resolve(runtimeDir, 'assets', 'form.css'))
    }

    if (options.hide_recaptcha) {
      nuxt.options.css.push(resolve(runtimeDir, 'assets', 'recaptcha.css'))
    }

    /**
     * Form Builder and generator
     */ 

    addComponent({
      name: 'FormBuilder',
      filePath: resolve(runtimeDir, 'components', 'FormBuilder')
    })

    addComponent({
      name: 'FormGenerator',
      filePath: resolve(runtimeDir, 'components', 'FormGenerator')
    })

    addComponent({
      name: 'FormInputContainer',
      filePath: resolve(runtimeDir, 'components', 'FormInputContainer')
    })

    addComponent({
      name: 'FormSubmit',
      filePath: resolve(runtimeDir, 'components', 'FormSubmit'),
      global: true
    })

    addImports({
      name: 'useFormBuilder',
      from: resolve(runtimeDir, 'composables', 'builder')
    })

    addImports({
      name: 'useFormRecaptcha',
      from: resolve(runtimeDir, 'composables', 'recaptcha')
    })

    addImports({
      name: 'FormInstance',
      from: resolve(runtimeDir, 'utils', 'FormInstance')
    })

    /**
     * Form Inputs components
     */ 

    addComponent({
      name: 'FormInput',
      global: true,
      filePath: resolve(runtimeDir, 'components', 'FormInput')
    })

    addComponent({
      name: 'FormSelect',
      global: true,
      filePath: resolve(runtimeDir, 'components', 'FormSelect')
    })

    addComponent({
      name: 'FormRadio',
      global: true,
      filePath: resolve(runtimeDir, 'components', 'FormRadio')
    })

    addComponent({
      name: 'FormTextarea',
      global: true,
      filePath: resolve(runtimeDir, 'components', 'FormTextarea')
    })

    addComponent({
      name: 'FormAlert',
      filePath: resolve(runtimeDir, 'components', 'FormAlert')
    })

    /**
     * Form Data
     */ 

    addImports({
      name: 'FormDataHandler',
      from: resolve(runtimeDir, 'utils/data', 'FormDataHandler')
    })
    
    /**
     * Form Validator
     */ 

    addImports({
      name: 'FormValidator',
      from: resolve(runtimeDir, 'utils/validators', 'FormValidator')
    })

    /**
     * Form Messages
     */ 

    addImports({
      name: 'FormMessageStore',
      from: resolve(runtimeDir, 'utils/messages', 'FormMessageStore')
    })

    addImports({
      name: 'FormMessages',
      from: resolve(runtimeDir, 'messages', 'form')
    })

    addImports({
      name: 'ValidatorMessages',
      from: resolve(runtimeDir, 'messages', 'validators')
    })

    /**
     * Form Actions
     */
    addImports({
      name: 'BasicFormActions',
      from: resolve(runtimeDir, 'utils/actions', 'BasicFormActions')
    })

    /**
     * Form Models
     */ 

    addImports({
      name: 'FormModelFormatter',
      from: resolve(runtimeDir, 'utils/models', 'FormModelFormatter')
    })

    addImports({
      name: 'NuxtFormField',
      from: resolve(runtimeDir, 'utils/models/decorators', 'FormDecorator')
    })

    
  }
})
