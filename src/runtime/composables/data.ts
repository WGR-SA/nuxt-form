import { useState } from '#app'
import { useVuelidate } from '@vuelidate/core'
import { AddFieldOptions } from '../../types/'

export const useFormData = () => {
  const state = useState<{[key: string]: string}>('form_state')
  const rules = useState<{[key: string]: any}>('form_rules')

  const v$ = useVuelidate(rules, state)

  const flushState = () => {
    state.value = {}
  }

  const addField = (options: AddFieldOptions) => {
    state.value[options.name] = ''
    rules.value[options.name] = options.rules
  }

  const addCustomData = (name: string, value: string) => {
    state.value[name] = value
  }

  const validateFields = async () => {
    return await v$.value.$validate()
  }

  return {
    state,
    rules,
    v$,
    flushState,
    addField,
    addCustomData,
    validateFields
  }
}
