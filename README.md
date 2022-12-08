# Nuxt-Form Module

Nuxt 3 module to create and post forms with integrated builder & inputs components. Automatic field validation included with [Vuelidate](https://vuelidate-next.netlify.app). Optional Recaptcha validation included with [Vue reCAPTCHA-v3](https://github.com/AurityLab/vue-recaptcha-v3).

## Install
Run `npm i @wgr-sa/nuxt-form`

### Add Module in NuxtConfig
```
export default defineNuxtConfig({
  modules: [
    '@wgr-sa/nuxt-form',
  ],
})	
```

### Add Recaptcha siteKey in .env if using recaptcha
`NUXT_PUBLIC_RECAPTCHA_SITEKEY=KEY`

## Config
```
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      recaptchaSitekey: '' // will automatically return key located in .env
    }
  },
  form: {
    recaptcha: boolean, // Use recaptcha | default: TRUE
    default_styles: boolean, // Add default module style from form.css | default: TRUE
    messages: object, // overwrite default messages | default: see message folder
    lang: string // lang 'fr' && 'en' available  
  }
}
```

## Use 

Add `FormBuilder` Component in template and include inputs components (`FormInput`, `FormSelect`, etc...) inside.

Exemple:
```
<FormBuilder fetchUrl="http://locahost:8888">
  <FormInput name="name_key" label="Name" :rules="['required']" placeholder="Name" />
  <FormInput name="email_key" label="Email" :rules="['required', 'email']" />
  <FormSelect name="select_key" label="Select" :options="select_options" />
  <FormTextarea name="message_key" label="Message" :rules="['required']" /> 
</FormBuilder>  
```

### Input types Component list 

- `FormInput` use input html tag and all his types (text, date, hidden, email, checkbox, etc...) exept radio buttons who use `FormRadio`
- `FormSelect` use select html tag
- `FormTextarea` use select textarea tag
- `FormRadio` special component for radio options

`rules` prop is used for field validation see [Vuelidate docs](https://vuelidate-next.netlify.app/validators.html) for details

### Component props 

#### `FormBuilder`
```
  fetchUrl: string,
  method?: 'POST' | 'GET',
  headers?: Object
```

#### `FormInput`
```
  name: string,
  label: string,
  rules?: string[],
  type?: string,
  required?: boolean,
  checked?: boolean,
  value?: string,
  placeholder?: string,
```

#### `FormSelect`extends `FormInput`
```
  options: { [key: string | number]: string }
```

#### `FormTextarea`extends `FormInput`
```
  rows?: number
```

#### `FormRadio`extends `FormInput`
```
  options: { [key: string | number]: string }
  default?: string
```

## Next
See issue tag for future features.
### Dev
- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

