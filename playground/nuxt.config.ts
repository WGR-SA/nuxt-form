import { defineNuxtConfig } from 'nuxt/config'
import NuxtForm from '..'

export default defineNuxtConfig({
  modules: [
    NuxtForm
  ],
  //debug: true,
  runtimeConfig: {
    public: {
      recaptchaSitekey: ''
    }
  },
  form: {
    recaptcha: true,
    default_styles: true,
    messages: {
      submit: 'Envoyer',
      alert: {
        submitted: 'Votre message a bien été envoyé.',
        submitting: 'Envoi en cours...',
        error: 'Une erreur est survenue',
      },
      error: {
        recaptcha: 'Une erreur est survenue avec le reCAPTCHA. Veuillez réessayer.',
        field_validation: 'Une erreur est survenue avec la validation des champs. Veuillez vérifier le formulaire et réessayer.',
        unknown: 'Une erreur inconnue est survenue. Veuillez réessayer.'
      }
    }
  }
})
