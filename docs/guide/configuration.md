# Configuration
Use the `form` key in your `nuxt.config.ts` file to configure all options:
```JS
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      recaptchaSitekey: ''
    }
  },
  form: {
    recaptcha: false
    hide_recaptcha: false
    mask: true
    default_styles: true
    messages: object, 
    lang: 'en', 
    format_layers: []
  }
}
```

## Options
- `recaptchaSitekey` Set it to return the Recaptcha key if needed. It will automatically return the key located in the .env file.
- `recaptcha` Set it to `true` if you use Recaptcha.
- `hide_recaptcha` Hide the Recaptcha badge.
- `mask` Enable input mask option. See [Mask](/guide/inputs.html#mask)
- `default_styles` Loads simple default styles for all components.
- `messages` Overwrite default form messages. See [Messages](/guide/build.html#messages) 
- `lang`: `en|fr` Make a pull request with new language if needed
- `format_layers` List of layers if using `FormGenerator`. See [`ModelFormatter`](/guide/model.html#modelformatter) 