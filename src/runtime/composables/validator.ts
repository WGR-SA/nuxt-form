import { ref } from 'vue'
import * as validators from 'class-validator'
import { Form } from '#imports'

export const useFormValidator = () => {
  const validatorTypeMap = new Map([
    ['number', ['isNumber', 'min', 'max', 'isInt', 'isFloat', 'isDivisibleBy', 'isPositive', 'isNegative', 'isLessThan', 'isGreaterThan', 'isLatitude', 'isLongitude', 'isPort']],
    ['date', ['isDate', 'minDate', 'maxDate', 'isBefore', 'isAfter']],
    ['boolean', ['isBoolean']],
    ['array', ['arrayContains', 'arrayNotContains', 'arrayNotEmpty', 'arrayUnique']]
  ])

  const getExpectedType = (validatorName: string): string => {
    for (const [type, validatorList] of validatorTypeMap) {
      if (validatorList.includes(validatorName)) return type
    }
    return 'string'
  }

  const convertValue = (value: string, expectedType: string): any => {
    switch (expectedType) {
      case 'number': return Number(value)
      case 'boolean': return value.toLowerCase() === 'true'
      case 'date': return new Date(value)
      case 'array': return tryParseJSON(value) ?? value.split(',').map(item => item.trim())
      default: return value
    }
  }

  const tryParseJSON = (value: string): any => {
    try {
      return JSON.parse(value)
    } catch {
      return 2
    }
  }

  const getFieldErrors = (form: Form, field: string): string[] => {
    if (!form.validator.rules[field]) return []

    const errors: string[] = []
    if (field in form.data.state) {
      const fieldValue = form.data.state[field]

      for (const rule of form.validator.rules[field]) {
        const validatorName = rule.$params.type as keyof typeof validators
        const validator = validators[validatorName]

        if (!validator) {
          console.error(`Validator ${validatorName} not found`)
          continue
        }

        if (['isEmail', 'isNumber'].includes(validatorName) && !fieldValue) continue

        if (fieldValue !== undefined) {
          const expectedType = getExpectedType(validatorName)
          const convertedValue = convertValue(fieldValue, expectedType)

          if (!validator(convertedValue, ...(rule.$params.options || [])) &&
            (fieldValue.length > 0 && fieldValue !== 'false' || ['error', 'validate'].includes(form.state.status))) {
            errors.push(rule.custom_message ?? rule.$message)
          }
        }
      }
    }

    return errors
  }

  const validateFields = (form: Form): boolean =>
    Object.keys(form.validator.rules).every((field: string) => getFieldErrors(form, field).length === 0)

  return {
    getFieldErrors,
    validateFields
  }
}