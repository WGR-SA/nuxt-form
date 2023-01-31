import { useRuntimeConfig, useHead } from '#app'
import { FormInstance } from '#imports'

export const useFormRecaptcha = () => {
  const sitekey = useRuntimeConfig().public.recaptchaSitekey

  const recaptchaInit = () => {
    if (useRuntimeConfig().public.form.recaptcha) {
      useHead({
        script: [
          { src: `https://www.google.com/recaptcha/api.js?render=${sitekey}` }
        ]
      })
    }
  }

  const recaptchaValidation = async (form: FormInstance) => {
    if (useRuntimeConfig().public.form.recaptcha) {
      const recaptcha = window.grecaptcha
      const recaptchaToken = await recaptcha.execute(sitekey, { action: 'contact' })
      if (!recaptchaToken) {
        return false
      }
      form.data.addCustomData('g-recaptcha-response', recaptchaToken)
    }
    return true
  }

  return {
    recaptchaInit,
    recaptchaValidation
  }
}
