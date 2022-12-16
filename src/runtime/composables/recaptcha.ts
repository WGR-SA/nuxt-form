import { useRuntimeConfig, useHead } from '#app'
import { useFormData } from './data'

export const useFormRecaptcha = () => {
  const sitekey = useRuntimeConfig().public.recaptchaSitekey
  const { addCustomData } = useFormData()

  const recaptchaInit = () => {
    if (useRuntimeConfig().public.form.recaptcha) {
      useHead({
        script: [
          { src: `https://www.google.com/recaptcha/api.js?render=${sitekey}` }
        ]
      })
    }
  }

  const recaptchaValidation = async () => {
    if (useRuntimeConfig().public.form.recaptcha) {
      const recaptcha = window.grecaptcha
      const recaptchaToken = await recaptcha.execute(sitekey, { action: 'contact' })
      if (!recaptchaToken) {
        return false
      }
      addCustomData('g-recaptcha-response', recaptchaToken)
    }
    return true
  }

  return {
    recaptchaInit,
    recaptchaValidation
  }
}
