import { computed } from 'vue'
import { useState, useRuntimeConfig } from '#app'
import { useFormData } from '../composables/data'
import { useFormSender } from '../composables/sender'
import * as defaultFormMessages from '../messages/form'

import type { FormConfig, FormState, FormMessages } from '../types'
import { FormConfigDefaults } from '../types'

export const useFormBuilder = () => {

  const { flushState, fieldValidation } = useFormData()
  const { recaptchaValidation, sendForm } = useFormSender()

  const moduleConfig = useRuntimeConfig().public.form
  const formConfig = useState<FormConfig>('form_config', () => FormConfigDefaults)
  const formState = useState<FormState>('form_status', () => ({ status: 'idle' }))  
  const defaultMessages: FormMessages = defaultFormMessages[moduleConfig.lang as keyof typeof defaultFormMessages] ?? defaultFormMessages.en
  const formMessages = computed<FormMessages>(() => ({ ...defaultMessages, ...moduleConfig.messages, ...formConfig.value.messages}))
  const showForm = computed<boolean>(() => formState.value.status === 'idle' || formState.value.status === 'error')

  const mutateFormState = (status: FormState['status'], errorType?: FormState['errorType']) => { 
    formState.value = { status, errorType }
  }

  const initForm = (fetchUrl: FormConfig['action'], newMethod: FormConfig['method'] | undefined, newHeaders: FormConfig['headers'] | undefined) => {
    formConfig.value = {
      ...formConfig.value,
      action: fetchUrl,
      method: newMethod ?? formConfig.value.method,
      headers: newHeaders ?? formConfig.value.headers
    }

    flushState()
  }

  const submitForm = async () => {
    const fv = await fieldValidation(), rv = await recaptchaValidation()
    
    if (!fv || !rv) {
      mutateFormState('error', !fv ? 'field_validation' : 'recaptcha')
      return
    }
    mutateFormState('submitting')
    sendForm()
  }

  return {
    showForm,
    formState,
    formMessages,
    mutateFormState,
    initForm,
    submitForm
  }
}
