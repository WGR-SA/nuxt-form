export interface FormMessages {
  submit: string,
  alert: {
    idle: string, //tmp
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
  action: URL,
  method?: string,
  headers?: Object,
  messages: FormMessages
}

export type FormStatus = 'idle' | 'submitting' | 'submitted' | 'error'
export type FormErrorType = 'field_validation' | 'recaptcha' | 'unknown' | false
export type FormState = { status: FormStatus, errorType?: FormErrorType } 

export const FormMessageDefaults: FormMessages = {
  submit: 'Submit',
  alert: {
    idle: 'your form is ready',
    submitting: 'Submitting...',
    submitted: 'Thank you for your submission!',
    error: 'There was an error submitting your form. Please try again.'
  },
  error: {
    recaptcha: 'There was an error with the reCAPTCHA. Please try again.',
    'field_validation': 'There was an error with field validation. Please check the form and try again.',
    unknown: 'There was an unknown error submitting your form. Please try again.'
  }
}

export const FormConfigDefaults: FormConfig = {
  action: new URL('http://localhost/'),
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  messages: FormMessageDefaults
}

