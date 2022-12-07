import { useState, useRuntimeConfig } from '#app'
import { useVuelidate } from '@vuelidate/core'
import * as validators from '@vuelidate/validators'
import { AddFieldOptions } from '../types'
import * as defaultValidatorsMessages from '../messages/validators'

export const useFormData = () => {

  const moduleConfig = useRuntimeConfig().public.form
  const state = useState<{[key: string]: string}>('form_state')
  const rules = useState<{[key: string]: any[]}>('form_rules')

  const v$ = useVuelidate(rules, state, { $autoDirty: true })
 
  const flushState = () => {
    state.value = {}
    rules.value = {}
  }

  const addField = (options: AddFieldOptions) => {    
    if (options.name in state.value) {
      return
    }
    state.value[options.name] = ''
    rules.value[options.name] = options.rules.map((r: string) => validators[r as keyof typeof validators])
    
    if (moduleConfig.lang !== 'en' && defaultValidatorsMessages[moduleConfig.lang as keyof typeof defaultValidatorsMessages]) {      
      rules.value[options.name] = rules.value[options.name].map((r: any) => ({...r, $message: defaultValidatorsMessages[moduleConfig.lang as keyof typeof defaultValidatorsMessages][r.$params.type]}))
    }
  }

  const setDefaultValue = (field: any) => {
    if (field.type === 'checkbox') state.value[field.name] = 'false'
    if (field.options) state.value[field.name] = field.default ?? Object.keys(field.options)[0]
    if (field.checked) state.value[field.name] = field.value ?? String(field.checked)
  }

  const addCustomData = (name: string, value: string) => {
    state.value[name] = value
  }

  const fieldValidation = async () => {
   return await v$.value.$validate()
  }

  return {
    v$,
    state,
    flushState,
    addField,
    setDefaultValue,
    addCustomData,
    fieldValidation
  }
}
