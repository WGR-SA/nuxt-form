import { reactive } from 'vue'
import { useRuntimeConfig } from '#app'
import { useFormValidator, useFormRecaptcha, Form } from '#imports'

export const useFormBuilder = () => {
  const { validatorInit, validatorExec } = useFormValidator()
  const { recaptchaInit, recaptchaValidation } = useFormRecaptcha()

  const initForm = (config: FormBuilder.Props) => {
    recaptchaInit()

    const form = reactive(new Form(config, useRuntimeConfig().public.form.lang))
    const validator = validatorInit(form.validator.rules, form.data.state)    

    return { form, validator }
  }

  const formReady = async (form: Form, validator: any ) => {

    if (!await validatorExec(validator)) {
      form.mutateState('error', 'field_validation')
      return
    }

    if (!await recaptchaValidation(form)) {
      form.mutateState('error', 'recaptcha')
      return
    }
  
    form.mutateState('ready')
  }

  return {
    initForm,
    formReady
  }
}
