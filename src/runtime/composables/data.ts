import { useState } from '#app'
import { useVuelidate } from '@vuelidate/core'
import { useFormBuilder } from '../composables/builder'
import * as validators from '@vuelidate/validators'
import { AddFieldOptions } from '../types'

export const useFormData = () => {
  const state = useState<{[key: string]: string}>('form_state')
  const rules = useState<{[key: string]: any[]}>('form_rules')

  const v$ = useVuelidate(rules, state)

  const { mutateFormState } = useFormBuilder()
 
  const flushState = () => {
    state.value = {}
  }

  const addField = (options: AddFieldOptions) => {
    state.value[options.name] = ''
    rules.value[options.name] = options.rules.map((r: string) => validators[r as keyof typeof validators])
  }

  const addCustomData = (name: string, value: string) => {
    state.value[name] = value
  }

  const fieldValidation = async () => {
    const validation = await v$.value.$validate()
    if (!validation) {
      mutateFormState('error', 'validation')
    }
    return validation
  }

  return {
    v$,
    flushState,
    addField,
    addCustomData,
    fieldValidation
  }
}
