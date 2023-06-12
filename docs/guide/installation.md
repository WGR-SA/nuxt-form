# Installation

You can install the module using npm:
```BASH
npm i @wgr-sa/nuxt-form
```

## Add Module to nuxt.config.ts
```JS
export default defineNuxtConfig({
  modules: [
    '@wgr-sa/nuxt-form',
  ],
})	
```

## Add Recaptcha Key
If you want to use Recaptcha validation, you need to add the public key to your .env file:
```BASH
NUXT_PUBLIC_RECAPTCHA_SITEKEY=123456789
```

