import { Ref } from 'vue'
import { useState } from '#app'
import { useVuelidate } from '@vuelidate/core'
import * as validators from '@vuelidate/validators'

export class FormDataHandler {
  private state: Ref<{ [key: string]: string }>
  private rules: Ref<{ [key: string]: any }>

  public v$: Ref

  constructor (fetchUrl: string) {
    this.state = useState(`${fetchUrl}.state`)
    this.rules = useState(`${fetchUrl}.rules`)
    this.v$ = useVuelidate(this.rules, this.state, { $autoDirty: true })
  }

  async fieldValidation () {
    return await this.v$.value.$validate()
  }

  getData () {
    return this.state.value
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
    // TO DO: add lng support for error messages
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
