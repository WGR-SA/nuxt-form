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


      const type_rules = [ 'isEmail', 'isNumber' ]
      // validate type only if field is not empty
      if (type_rules.includes(rule.$params.type) && (form.data.state[field].length === 0 || form.data.state[field] === null)) {        
        return
      }

      // @ts-ignore TODO: import only validation functions
      const result = validator(form.data.state[field].toString(), rule.$params.options) 
      
      if (!result && (form.data.state[field].length > 0 && form.data.state[field] !== 'false' || ['error', 'validate'].includes(form.state.status))) {
        errors.value.push(rule.custom_message ?? rule.$message)
      }
    })

    return errors.value
  }

  const validateFields = async (form: Form): Promise<boolean> => {        
    return !Object.keys(form.validator.rules).some((field: string) => getFieldErrors(form, field).length > 0)
  }

  return {
    getFieldErrors,
    validateFields
  }
}