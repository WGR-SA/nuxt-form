import { useState } from '#app'
import { useVuelidate } from '@vuelidate/core'
import * as validators from '@vuelidate/validators'
import { AddFieldOptions } from '../types'

export const useFormData = () => {
  const state = useState<{[key: string]: string}>('form_state')
  const rules = useState<{[key: string]: any[]}>('form_rules')

  const v$ = useVuelidate(rules, state)
 
  const flushState = () => {
    state.value = {}
    rules.value = {}
  }

  const addField = (options: AddFieldOptions) => {    
    state.value[options.name] = ''
    rules.value[options.name] = options.rules.map((r: string) => validators[r as keyof typeof validators])
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
    addCustomData,
    fieldValidation
  }
}
