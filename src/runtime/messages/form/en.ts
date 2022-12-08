import { FormMessages } from '../../types'

export const en: FormMessages = {
  submit: 'Submit',
  alert: {
    idle: 'your form is ready',
    submitting: 'Submitting...',
    submitted: 'Thank you for your submission!',
    error: 'There was an error submitting your form. Please try again.'
  },
  error: {
    recaptcha: 'There was an error with the reCAPTCHA. Please try again.',
    field_validation: 'There was an error with field validation. Please check the form and try again.',
    unknown: 'There was an unknown error submitting your form. Please try again.'
  }
}
