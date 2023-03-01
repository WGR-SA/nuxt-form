# Nuxt-Form

Nuxt module to create and post forms with integrated builder, inputs components and optional Recaptcha validation. Automatic field validation included with [class-validator](https://github.com/typestack/class-validator). Input data mask also included with [maska](https://beholdr.github.io/maska)

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
    recaptcha?: boolean, // Use recaptcha | default: TRUE
    hide_recaptcha?: boolean, // Hide recaptcha badge | default: FALSE
    mask: Add maska with default values | default TRUE
    default_styles?: boolean, // Add default module style from form.css | default: TRUE
    messages?: object, // overwrite default messages | default: see message folder
    lang?: string // lang 'fr' && 'en' available  
    format_layers?: string[], | default 'base' for typeorm use ['typeorm', 'class-validator', 'form']
  }
}
```

## Use 

Add `FormBuilder` Component in template and include inputs components (`FormInput`, `FormSelect`, etc...) inside.

Exemple:
```
<FormBuilder action="http://locahost:8888">
  <FormInput name="name_key" label="Name" :rules="['isNotEmpty']" placeholder="Name" />
  <FormInput name="email_key" label="Email" :rules="['isNotEmpty', 'isEmail']" />
  <FormSelect name="select_key" label="Select" :options="select_options" />
  <FormTextarea name="message_key" label="Message" :rules="['isNotEmpty']" /> 
</FormBuilder>  
```

### Input types Component list 

- `FormInput` use input html tag and all his types (text, date, hidden, email, checkbox, etc...) exept radio buttons who use `FormRadio`
- `FormSelect` use select html tag
- `FormTextarea` use select textarea tag
- `FormRadio` special component for radio options

`rules` prop is used for field validation see [Validation decorators](https://github.com/typestack/class-validator#validation-decorators) or [Validator](https://github.com/validatorjs/validator.js) for details

`mask` prop is used for masking input content see [Maska docs](https://beholdr.github.io/) for details. For custom tokens use disable mask module options and init a `new MaskInput("[data-maska]")` in `onMounted`.

### Component props 

#### `FormBuilder`
```
  action: string,
  process?: FormActionsMethods,
  actions?: FormActions<unknown>,
  fetchOptions?: UseFetchOptions<unknown>,
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
```

#### `FormInput`
```
  name: string,
  label?: string,
  rules?: string[],
  type?: string,
  mask?: string, 
  required?: boolean,
  checked?: boolean,
  value?: string,
  placeholder?: string,
```

#### `FormSelect` extends `FormInput`
```
  options: { [key: string | number]: string }
```

#### `FormTextarea` extends `FormInput`
```
  rows?: number
```

#### `FormRadio` extends `FormInput`
```
  options: { [key: string | number]: string }
  default?: string
```

## Next
See issue tag for future features.
### Dev
- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

