import { reactive } from 'vue'
import { useRuntimeConfig } from '#app'
import { useVuelidate } from '@vuelidate/core'
import { useFormRecaptcha, FormInstance } from '#imports'

export const useFormBuilder = () => {
  const { recaptchaInit, recaptchaValidation } = useFormRecaptcha()
  const lang = useRuntimeConfig().public.form.lang

  const initForm = (config: FormBuilder.Props) => {
    const form = reactive(new FormInstance(config))
    const validator = validatorInit(form.validator.rules, form.data.state)    

    recaptchaInit()

    form.messages.setLang(lang)

    return { form, validator }
  }

  const validatorInit = (rules: { [key: string]: any }, state: { [key: string]: any }) => {
    return useVuelidate(rules, state, { $autoDirty: true })
  }

  const formReady = async (form: FormInstance, validator: any ) => {
    const fv = await validator.value.$validate()
    const rv = await recaptchaValidation(form)

    if (!fv || !rv) {
      form.mutateState('error', !fv ? 'field_validation' : 'recaptcha')
      return
    }

    form.mutateState('ready')
  }

  return {
    initForm,
    formReady
  }
}
