import { useRuntimeConfig, useHead } from '#app'
import { Form } from '#imports'

export const useFormRecaptcha = () => {
  const sitekey = useRuntimeConfig().public.recaptchaSitekey

  const init = () => {
    if (useRuntimeConfig().public.form.recaptcha) {
      useHead({
        script: [
          { src: `https://www.google.com/recaptcha/api.js?render=${sitekey}` }
        ]
      })
    }
  }

  const invokeChallenge = async (form: Form) => {
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
    init,
    invokeChallenge
  }
}
