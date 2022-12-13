import { load } from 'recaptcha-v3'
import { useRuntimeConfig } from '#app'

import { useFormData } from './data'

export const useFormRecaptcha = () => {
  const sitekey = useRuntimeConfig().public.recaptchaSitekey
  const { addCustomData } = useFormData()

  const recaptchaValidation = async () => {
    if (useRuntimeConfig().public.form.recaptcha) {
      const recaptcha = await load(sitekey)
      const recaptchaToken: string | null = await recaptcha.execute('contact')
      if (!recaptchaToken) {
        return false
      }
      addCustomData('g-recaptcha-response', recaptchaToken)
    }
    return true
  }

  return {
    recaptchaValidation
  }
}
