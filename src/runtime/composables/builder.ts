import { useState, useFetch } from '#app'
import { FormInstance } from '../classes/builder'
import { useFormRecaptcha } from './recaptcha'

export const useFormBuilder = () => {
  const { recaptchaValidation } = useFormRecaptcha()

  const forms = useState<FormInstance[]>('forms', () => ([]))

  const initForm = (config: FormInstance) => {
    forms.value.push(new FormInstance(config))
    return getFormInstance(config.fetchUrl)
  }

  const getFormInstance = (fetchUrl: string) => {
    const form = forms.value.find((form: FormInstance) => form.fetchUrl === fetchUrl)
    if (!form) {
      throw new Error(`Form with key ${fetchUrl} not found`)
    }
    return form
  }

  const submitForm = async (form: FormInstance) => {
    const fv = await form.dataHandler.fieldValidation()
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
