import { reactive } from 'vue'
import { useFetch, useRuntimeConfig } from '#app'
import { useVuelidate } from '@vuelidate/core'
import { useFormRecaptcha, FormInstance } from '#imports'

export const useFormBuilder = () => {
  const { recaptchaInit, recaptchaValidation } = useFormRecaptcha()
  const lang = useRuntimeConfig().public.form.lang

  const initForm = (config: FormBuilder.Props) => {
    const form = reactive(new FormInstance(config))
    const validator = validatorInit(form.data.rules, form.data.state)
    
    recaptchaInit()

    form.messages.setLang(lang)

    return { form, validator }
  }

  const validatorInit = (rules: { [key: string]: any }, state: { [key: string]: any }) => {
    return useVuelidate(rules, state, { $autoDirty: true })
  }

  const submitForm = async (form: any, validator: any ) => {
    const fv = await validator.$validate()
    const rv = await recaptchaValidation(form)

    if (!fv || !rv) {
      form.mutateState('error', !fv ? 'field_validation' : 'recaptcha')
      return
    }
    form.mutateState('submitting')

    const { data, error } = await useFetch(form.action, form.fetchParams)

    if (error.value) {
      form.mutateState('error', error?.value?.statusMessage ?? 'unknown')
      return
    }

    if (data.value) {
      form.response = data
    }

    form.mutateState('submitted')
  }

  return {
    initForm,
    submitForm
  }
}
