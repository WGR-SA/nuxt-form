import { reactive } from 'vue'
import { useRuntimeConfig } from '#app'
import { useFormValidator, useFormRecaptcha, Form } from '#imports'

export const useFormBuilder = () => {

  const { recaptchaInit, recaptchaValidation } = useFormRecaptcha()
  const { validateAllFields } = useFormValidator()

  const initForm = (config: FormBuilder.Props) => {

    const form = reactive(new Form(config, useRuntimeConfig().public.form))
    recaptchaInit()

    return form
  }

  const formReady = async (form: Form ) => {

    if (!await validateAllFields(form)) {
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
