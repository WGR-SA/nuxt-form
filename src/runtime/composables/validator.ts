import { useVuelidate } from '@vuelidate/core'

export const useFormValidator = () => {

  const validatorInit = (rules: { [key: string]: any }, state: { [key: string]: any }) => {
    return useVuelidate(rules, state, { $autoDirty: true })
  }

  const validatorExec = async (validator: any) => {
    return await validator.value.$validate()
  }

  return {
    validatorInit,
    validatorExec
  }
}