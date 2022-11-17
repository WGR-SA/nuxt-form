import { ref } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useRuntimeConfig } from '#app'
import { useFormData } from '../composables/data'

import type { FormStatus } from '../../types'

export const useFormBuilder = () => {
  const { state, validateFields } = useFormData()
  const labels = ref({ submit: 'Send', alert: { submitting: 'Sending', submitted: 'Success', error: 'Error' } })
  const status = ref<FormStatus>('idle')
  const recaptcha = useRuntimeConfig().public.form.recaptcha ? useReCaptcha() : null

  const setLabel = (key: string, value: string) => {
    labels.value[key] = value
  }

  const mutateStatus = (newStatus: FormStatus) => {
    status.value = newStatus
  }

  const send = async () => {
    mutateStatus('submitting')

    if (recaptcha) {
      await recaptcha.recaptchaLoaded()
      const recaptchaToken: String | null = await recaptcha.executeRecaptcha('contact')
    }

    const validation = await validateFields()
    if (!validation) {
      mutateStatus('error')
      return false
    }
  }

  return {
    status,
    labels,
    setLabel,
    send
  }
}
