<script lang="ts" setup>
import { required, email } from '@vuelidate/validators'

const formData = [
  ['name', '', { required, $autoDirty: true }, 'Nom'],
  ['email', '', { required, $autoDirty: true }, 'Email'],
  ['message', '', { required, $autoDirty: true }, 'Message', 'textarea']
]

const fetchUrl = 'https://wgr.ch/api/contact'

const recaptcha = true
</script>

<template>
  <section>
    <FormBuilder :form-data="formData" :fetch-url="fetchUrl" :recaptcha="true" />
  </section>
</template>
