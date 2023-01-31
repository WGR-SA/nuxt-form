<script lang="ts" setup>
import { useFormBuilder } from '../composables/builder'
import { useFormRecaptcha } from '../composables/recaptcha'

const config = defineProps<FormBuilder.Props>()
const { recaptchaInit } = useFormRecaptcha()
const { initForm, submitForm } = useFormBuilder()
const form = initForm(config)

recaptchaInit()
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="form.shown">
      <slot />
      <button type="submit" @click.prevent="submitForm(form)">
        {{ form.messages.submit }}
      </button>
    </fieldset>
  </form>
</template>
