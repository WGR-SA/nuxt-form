import { useReCaptcha } from 'vue-recaptcha-v3'
import { useRuntimeConfig } from '#app'
import { useFormData } from './data'

export const useFormRecaptcha = () => {
  const recaptcha = useRuntimeConfig().public.form.recaptcha ? useReCaptcha() : null
  const { addCustomData } = useFormData()

  const recaptchaValidation = async () => {
    if (recaptcha) {
      await recaptcha.recaptchaLoaded()
      const recaptchaToken: string | null = await recaptcha.executeRecaptcha('contact')
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
