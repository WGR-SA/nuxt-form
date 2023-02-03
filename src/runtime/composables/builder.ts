import { ref } from 'vue'
import { useState, useFetch } from '#app'
import { useVuelidate } from '@vuelidate/core'
import { useFormRecaptcha, useFormMessage, FormInstance } from '#imports'

export const useFormBuilder = () => {
  const { recaptchaInit, recaptchaValidation } = useFormRecaptcha()
  const { initFormMessage } = useFormMessage()

  const forms = useState<FormInstance[]>('forms', () => ([]))

  const initForm = (config: FormBuilder.Props) => {
    recaptchaInit()

    const rules = ref({})
    const state = ref({})
    const v$ = useVuelidate(rules, state, { $autoDirty: true })

    const form = new FormInstance(config, rules, state, v$)
    initFormMessage(config.fetchUrl, config.messages)
  
    return form
  }

  const getFormInstance = (fetchUrl: string) => {
    const form = forms.value.find((form: FormInstance) => form.fetchUrl === fetchUrl)
    if (!form) {
      throw new Error(`Form with key ${fetchUrl} not found`)
    }
    return form
  }

  const submitForm = async (form: FormInstance) => {
    const fv = await form.data.fieldValidation()
    console.log('fv', fv);
    console.log(form.data);
    
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
    getFormInstance,
    submitForm
  }
}
