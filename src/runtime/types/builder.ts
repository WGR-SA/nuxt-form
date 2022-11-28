export interface FormMessages {
  submit: string,
  alert: {
    submitting: string,
    submitted: string,
    error: string
  },
  error: {
    recaptcha: string,
    validation: string,
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
export type FormErrorType = 'validation' | 'recaptcha' | 'unknown' | false
export type FormState = { status: FormStatus, errorType?: FormErrorType } 

export const FormMessageDefaults: FormMessages = {
  submit: 'Submit',
  alert: {
    submitting: 'Submitting...',
    submitted: 'Thank you for your submission!',
    error: 'There was an error submitting your form. Please try again.'
  },
  error: {
    recaptcha: 'There was an error with the reCAPTCHA. Please try again.',
    validation: 'There was an error with your submission. Please check the form and try again.',
    unknown: 'There was an error submitting your form. Please try again.'
  }
}

export const FormConfigDefaults: FormConfig = {
  action: new URL('http://localhost/'),
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  messages: FormMessageDefaults
}

