import { ref } from 'vue'
import * as validators from 'class-validator'
import { Form } from '#imports'

export const useFormValidator = () => {

  const validateField = (form: Form, field: string): string[] => {
    
    const errors = ref<string[]>([]) 

    if (!form.validator.rules[field]) {
      return []
    }

    form.validator.rules[field].forEach((rule: any) => {      
      const validator = validators[rule.$params.type as keyof typeof validators]
      console.log(rule.$params.type, typeof validator);
      
      if (!validator || typeof validator !== 'function') {
        return
      }

      // @ts-ignore TODO: fix this
      const result = validator(form.data.state[field], rule.$params.options)
      
      if (!result && form.data.state[field].length > 0) {
        errors.value.push(rule.$message)
      }
    })

    return errors.value
  }

  const validateAllFields = async (form: Form) => {
    
    const fields = Object.keys(form.validator.rules)
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      const errors = validateField(form, field)
      if (errors.length > 0) {
        return false
      }
    }
    return true
  }

  return {
    validateField,
    validateAllFields,
  }
}