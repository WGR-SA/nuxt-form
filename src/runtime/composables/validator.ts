import { ref } from 'vue'
import * as validators from 'class-validator'
import { Form } from '#imports'

export const useFormValidator = () => {

  const getFieldErrors = (form: Form, field: string): string[] => {
    
    const errors = ref<string[]>([]) 

    if (!form.validator.rules[field]) {
      return []
    }

    form.validator.rules[field].forEach((rule: any) => {      
      const validator = validators[rule.$params.type as keyof typeof validators]      

      // @ts-ignore TODO: import only validation functions
      const result = validator(form.data.state[field], rule.$params.options)      
      
      if (!result && (form.data.state[field].length > 0 || ['error', 'validate'].includes(form.state.status))) {
        errors.value.push(rule.$message)
      }
    })

    return errors.value
  }

  const validateFields = async (form: Form): Promise<boolean> => {    
    Object.keys(form.validator.rules).forEach((field: string) => {
      if (getFieldErrors(form, field).length > 0) {
        return false
      }
    })
    return true
  }

  return {
    getFieldErrors,
    validateFields
  }
}