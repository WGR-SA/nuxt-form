import { FormMessages } from '../../types'

export const fr: FormMessages = {
  submit: 'Envoyer',
  alert: {
    idle: 'Votre formulaire est prêt à être soumis.',
    submitting: 'Envoi en cours...',
    submitted: 'Votre message a bien été envoyé.',
    error: 'Une erreur est survenue'
  },
  error: {
    recaptcha: 'Une erreur est survenue avec le reCAPTCHA. Veuillez réessayer.',
    field_validation: 'Une erreur est survenue avec la validation des champs. Veuillez vérifier le formulaire et réessayer.',
    unknown: 'Une erreur inconnue est survenue. Veuillez réessayer.'
  }
}
