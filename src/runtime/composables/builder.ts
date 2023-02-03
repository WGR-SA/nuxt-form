import { ref, reactive } from 'vue'
import { useFetch } from '#app'
import { useVuelidate } from '@vuelidate/core'
import { useFormRecaptcha, useFormMessage, FormInstance } from '#imports'

export const useFormBuilder = () => {
  const { recaptchaInit, recaptchaValidation } = useFormRecaptcha()
  const { initFormMessage } = useFormMessage()

  const initForm = (config: FormBuilder.Props) => {
    const form = reactive(new FormInstance(config))
    const validator = validatorInit(form.data.rules, form.data.state)
    
    recaptchaInit()
    initFormMessage(config.fetchUrl, config.messages)

    return { form, validator }
  }

  const validatorInit = (rules: any, state: any) => {
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

    const { data, error } = await useFetch(form.fetchUrl, form.fetchParams)

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
