import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { AddFieldOptions } from '../../types/'

export const useFormData = () => {
  const state = reactive({})
  const rules = reactive({})
  const v$ = useVuelidate(rules, state)

  const addField = (options: AddFieldOptions) => {
    state[options.name] = ''
    rules[options.name] = options.rules
  }

  const validateFields = async () => {
    return await v$.value.$validate()
  }

  return {
    state,
    rules,
    v$,
    addField,
    validateFields
  }
}
