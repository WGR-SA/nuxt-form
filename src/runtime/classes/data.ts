import { Ref } from 'vue'
import { useState, useRuntimeConfig } from '#app'

import { useVuelidate } from '@vuelidate/core'
import * as validators from '@vuelidate/validators'
import * as defaultValidatorsMessages from '../messages/validators'

export class FormDataHandler {
  private state: Ref<{ [key: string]: string }>
  private rules: Ref<{ [key: string]: unknown }>

  public v$: Ref
  public moduleConfig: FormModule.options = useRuntimeConfig().public.form

  constructor (fetchUrl: string) {
    this.state = useState(`${fetchUrl}.data`)
    this.rules = useState(`${fetchUrl}.rules`)
    this.v$ = useVuelidate(this.rules, this.state, { $autoDirty: true })
  }

  async fieldValidation () {
    return await this.v$.value.$validate()
  }

  flushData () {
    this.state.value = {}
    this.rules.value = {}
  }

  addField (options: { name: string, rules: string[] }) {
    if (options.name in this.state.value) {
      return
    }
    this.state.value[options.name] = ''
    this.rules.value[options.name] = options.rules.map((r: string) => validators[r as keyof typeof validators])
    if (this.moduleConfig.lang !== 'en' && defaultValidatorsMessages[moduleConfig.lang as keyof typeof defaultValidatorsMessages]) {
      this.rules.value[options.name] = this.rules.value[options.name].map((r: unknown) => ({ ...r, $message: defaultValidatorsMessages[moduleConfig.lang as keyof typeof defaultValidatorsMessages][r.$params.type] }))
    }
  }

  setDefaultValue (field: any) {
    if (field.type === 'checkbox') {
      this.state.value[field.name] = 'false'
    }
    if (field.options) {
      this.state.value[field.name] = field.default ?? Object.keys(field.options)[0]
    }
    if (field.checked) {
      this.state.value[field.name] = field.value ?? String(field.checked)
    }
  }

  addCustomData (name: string, value: string) {
    this.state.value[name] = value
  }
}
