import { useReCaptcha } from 'vue-recaptcha-v3'
import { useRuntimeConfig, useState } from '#app'
import { useFormData } from '../composables/data'

import type { FormStatus, FormErrorType, FormMessages } from '../../types'
import { FormMessageDefaults } from '../../types'

export const useFormBuilder = () => {
  const { state, flushState, addCustomData, validateFields } = useFormData()

  const method = useState<string>('form_methods', () => 'POST')
  const action = useState<URL>('form_action')
  const headers = useState<Object>('form_headers', () => ({ 'Content-Type': 'application/json', 'Accept': 'application/json' }))
  const messages = useState<FormMessages>('form_messages', () => FormMessageDefaults)
  const status = useState<FormStatus>('form_status', () => 'idle')   
  const errorType = useState<FormErrorType>('form_error_type', () => false)
  const recaptcha = useRuntimeConfig().public.form.recaptcha ? useReCaptcha() : null

  const mutateStatus = (newStatus: FormStatus, newErrorType?: FormErrorType) => {
    status.value = newStatus
    errorType.value = newErrorType ?? false
  }

  const setMessage = (key: string, value: string) => {
    messages.value[key] = value
  }

  const initForm = (fetchUrl: URL, newMethod: string | undefined, NewHeaders: Object | undefined) => {
    action.value = fetchUrl
    if (newMethod) method.value = newMethod
    if (NewHeaders) headers.value = NewHeaders

    mutateStatus('idle')
    flushState()
  }

  const recaptchaCheck = async () => {
    if (recaptcha) {
      await recaptcha.recaptchaLoaded()
      const recaptchaToken: string | null = await recaptcha.executeRecaptcha('contact')
      if (!recaptchaToken) {
        mutateStatus('error', 'recaptcha')
        return
      }
      addCustomData('g-recaptcha-response', recaptchaToken)
    }
  }

  const validationCheck = async () => {
    const isValid = await validateFields()
    if (!isValid) mutateStatus('error', 'validation')
  }

  const submit = () => {
    
    recaptchaCheck()
    validationCheck()

    if (status.value === 'error') return
    send()
  }

  const send = async () => {
    mutateStatus('submitting')
    //
  }

  return {
    method,
    action,
    headers,
    status,
    messages,
    mutateStatus,
    initForm,
    setMessage,
    submit
  }
}
