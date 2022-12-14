export interface FormMessages {
  submit: string,
  alert: {
    idle: string,
    submitting: string,
    submitted: string,
    error: string
  },
  error: {
    recaptcha: string,
    field_validation: string,
    unknown: string
  }
  [key: string]: any
}

export type FormConfig = {
  action: string,
  method?: string,
  headers?: Object,
  messages: FormMessages
}

export type FormStatus = 'idle' | 'submitting' | 'submitted' | 'error'
export type FormErrorType = 'field_validation' | 'recaptcha' | 'unknown' | false
export type FormState = { status: FormStatus, errorType?: FormErrorType | string }

export const FormConfigDefaults: FormConfig = {
  action: 'http://localhost/',
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  messages: {} as FormMessages
}
