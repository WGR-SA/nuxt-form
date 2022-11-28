import { computed } from 'vue'
import { useState } from '#app'
import { useFormData } from '../composables/data'
import { useFormSender } from '../composables/sender'

import type { FormConfig, FormState, FormMessages } from '../types'
import { FormConfigDefaults } from '../types'

export const useFormBuilder = () => {
  const useformdata = useFormData()
  const { flushState, fieldValidation } = useFormData()
  const { sendForm, recaptchaValidation } = useFormSender()

  const formConfig = useState<FormConfig>('form_config', () => FormConfigDefaults)
  const formState = useState<FormState>('form_status', () => ({ status: 'idle' }))  
  const formHasErrors = computed<boolean>(() => formState.value.status === 'error') 
  const showForm = computed<boolean>(() => formState.value.status === 'idle' || formState.value.status === 'error')
  const getFormStatus = computed<string>(() => formState.value.status)
  const getFormMessages = computed<FormMessages>(() => formConfig.value.messages)

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
    await fieldValidation()
    await recaptchaValidation()
    
    if ( formHasErrors ) return
    sendForm()
  }

  return {
    showForm,
    getFormStatus,
    getFormMessages,
    mutateFormState,
    initForm,
    submitForm
  }
}
