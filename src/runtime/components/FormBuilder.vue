<script lang="ts" setup>
import { useFormBuilder } from '../composables/builder'
import { useFormRecaptcha } from '../composables/recaptcha'

interface FormBuilderProps {
  fetchUrl: string,
  method?: 'POST' | 'GET',
  headers?: Object
}

const props = defineProps<FormBuilderProps>()
const { recaptchaInit } = useFormRecaptcha()
const { showForm, formMessages, initForm, submitForm } = useFormBuilder()

recaptchaInit()
initForm(props.fetchUrl, props.method, props.headers)

</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="showForm">
      <slot></slot>
      <button type="submit" @click.prevent="submitForm">
        {{ formMessages.submit }}
      </button>
    </fieldset>
  </form>
</template>
