import { useState, useFetch } from '#app'
import { FormInstance } from '#imports'
import { useFormRecaptcha } from '#imports'
import { useFormMessage } from '#imports'

export const useFormBuilder = () => {
  const { recaptchaValidation } = useFormRecaptcha()
  const { initFormMessage } = useFormMessage()

  const forms = useState<FormInstance[]>('forms', () => ([]))

  const initForm = (config: FormBuilder.Props) => {
    const form = new FormInstance(config)
    forms.value.push(form)
    
    initFormMessage(config.fetchUrl, config.messages)

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
    const fv = await form.data.fieldValidation()
    const rv = await recaptchaValidation(form)

    if (!fv || !rv) {
      form.mutateState('error', !fv ? 'field_validation' : 'recaptcha')
      return
    }
    form.mutateState('submitting')

    const { data, error } = await useFetch(form.fetchUrl, form.fetchParams as any) // TODO: fix this

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
