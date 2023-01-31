<script lang="ts" setup>
import { useFormBuilder } from '#imports'
import { useFormRecaptcha } from '#imports'

const config = defineProps<{
  fetchUrl: string,
  method?: 'POST' | 'GET',
  headers?: Object,
  stringify?: boolean,
  messages?: Partial<FormBuilder.Messages>,
}>()
const { recaptchaInit } = useFormRecaptcha()
const { initForm, submitForm } = useFormBuilder()
const form = initForm(config as FormBuilder.Props)

recaptchaInit()
</script>

<template>
  <form class="form">
    <!-- <FormAlert /> -->
    <fieldset v-if="form.shown">
      <slot />
      <button 
        type="submit" 
        @click.prevent="submitForm(form)"
      >
        {{ form.messages.submit }}
      </button>
    </fieldset>
  </form>
</template>
