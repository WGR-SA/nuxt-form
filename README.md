# Form Builder Nuxt 3 Module

## Install
- Run `npm i @wgr-sa/nuxt-form`

### Add Module in NuxtConfig
```
export default defineNuxtConfig({
  modules: [
    '@wgr-sa/nuxt-form',
  ],
})	
```

### Add Recaptcha siteKey in .env if using recaptcha
`RECAPTCHA_SITE_KEY=KEY`

## Setup

### Import validators from Vuelidate see [Vuelidate docs](https://vuelidate-next.netlify.app/validators.html) for details
`import { required, email, ... } from '@vuelidate/validators'`

### Set FormData 
`[name, value, validators {}, label, type (default 'input')]`

#### Exemple
```
  const formData = [
  ['name', '', { required, $autoDirty: true }, 'Nom'],
  ['email', '', { required, $autoDirty: true }, 'Email'],
  ['message', '', { required, $autoDirty: true }, 'Message', 'textarea']
]	
```

### Add FormBuilder Component 
`<FormBuilder :form-data="formData" :fetch-url="fetchUrl" :recaptcha="false" />`

#### Component props
```
method: { type: String, default: 'POST' },
formData: { type: Object, default: reactive({}) },
fetchUrl: { type: String, default: '' },
recaptcha: { type: Boolean, default: true },
options: { type: Object, default: reactive({}) },
staticMessages: {
  type: Object,
  default: reactive({
    success: 'Votre message a bien été envoyé.',
    loading: 'Envoi en cours...',
    btnSend: 'Envoyer'
  })
},
headers: {
  type: Object,
  default: reactive({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
},
additionalStaticFields: { type: Object, default: reactive({}) }
```
