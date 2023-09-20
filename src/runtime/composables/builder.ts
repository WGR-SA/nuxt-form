import { reactive } from 'vue'
import { useRuntimeConfig } from '#app'
import { useFormValidator, useFormRecaptcha, Form } from '#imports'

export const useFormBuilder = () => {

  const { init: initRecaptcha, invokeChallenge } = useFormRecaptcha()
  const { validateFields } = useFormValidator()

  const initForm = (config: FormBuilder.Props) => {

    const form = reactive(new Form(config, useRuntimeConfig().public.form))
    initRecaptcha()

    return form
  }

  const validateForm = async (form: Form): Promise<boolean> => {
    if (!await validateFields(form)) {
      form.mutateState('error', 'field_validation')
      return false
    }

    if (!await invokeChallenge(form)) {
      form.mutateState('error', 'recaptcha')
      return false
    }
  
    form.mutateState('ready')
    return true
  }

  return {
    initForm,
    validateForm,
    // DEPRECATED: Tmp alias for backwards compatibility
    formReady: validateForm
  }
}
