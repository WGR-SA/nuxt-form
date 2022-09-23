<script lang="ts" setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { useNuxtApp, useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const app = useNuxtApp()

if (config.nuxtForm.recaptchaSiteKey) {
  app.vueApp.use(VueReCaptcha, { siteKey: config.nuxtForm.recaptchaSiteKey })
}

const props = defineProps({
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
})

// Init validation & fields
interface FormInputs { [key: string]: any }

const getFormOptions = (data: any, outputKey: number) => {
  const options = {}
  data.forEach((item: any) => {
    options[item[0]] = item[outputKey] ?? null
  })
  return options
}

const state = reactive<FormInputs>(getFormOptions(props.formData, 1) ?? {})
const rules: FormInputs = getFormOptions(props.formData, 2) ?? {}
const labels: FormInputs = getFormOptions(props.formData, 3) ?? {}
const types: FormInputs = getFormOptions(props.formData, 4) ?? {}

// Init validation
const v$ = (rules && state) ? useVuelidate(rules, state) : null

// Set form states
const formStates = reactive({ status: 'init', errorMessage: '' })

const mutateFormState = function (status: 'init'|'loading'|'success'|'error', message = '') {
  formStates.status = status
  formStates.errorMessage = message
}

// Recaptcha
const rc = (props.recaptcha) ? useReCaptcha() : null
let token: String | null = null

const recaptchaCheck = async () => {
  if (!rc) {
    sendForm(null)
    return
  }
  await rc.recaptchaLoaded()
  token = await rc.executeRecaptcha('contact')

  if (token) { sendForm(token) }
}

// Send
const sendForm = async function (token: String | null) {
  // Validate from
  if (v$) {
    const result = await v$.value.$validate()
    if (!result) { return }
  }

  const data = { ...state, ...props.additionalStaticFields }
  if (rc) { data['g-recaptcha-response'] = token }

  mutateFormState('loading')

  fetch(props.fetchUrl, {
    method: props.method,
    headers: { ...props.headers.value },
    body: JSON.stringify(data)
  })
    .then((response) => {
      mutateFormState((response.status < 300) ? 'success' : 'error', response.statusText)
    })
    .catch(response => mutateFormState('error', response.statusText))
}

</script>

<template>
  <section>
    <label v-if="formStates.status != 'init'">
      {{ staticMessages[formStates.status] ?? formStates.errorMessage }}
    </label>
    <form v-if="formStates.status == 'init' || 'error'">
      <slot v-for="(value, i) in state" :key="i">
        <label :for="i.toString">{{ labels[i] ?? i }}</label>
        <component :is="(types[i] === 'textarea') ? 'textarea' : 'input'" :id="i.toString" v-model="state[i]" :type="types[i] ?? 'text'" :name="i" />
        <template v-if="v$">
          <p v-for="error of v$[i].$errors" :key="error.$uid" class="input__errors">
            {{ error.$message }}
          </p>
        </template>
      </slot>
      <button type="submit" @click.prevent="recaptchaCheck">
        {{ staticMessages.btnSend }}
      </button>
    </form>
  </section>
</template>
