<script lang="ts" setup>
import { provide } from 'vue'
import { useFormBuilder, useFormMessage, FormInstance } from '#imports'

const { initForm, submitForm } = useFormBuilder()
const { getFormMessage } = useFormMessage()

const config = defineProps<{ 
  fetchUrl: string, 
  method?: 'POST' | 'GET',
  headers?: { [key: string]: string }, 
  stringify?: boolean, 
  messages?: Partial<FormBuilder.Messages> 
}>()

const { form, validator } = initForm(config as FormBuilder.Props)

provide('form', form)
provide('validator', validator)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="form.shown">
      <slot />
      <button 
        type="submit" 
        @click.prevent="submitForm(form, validator)"
      >
        {{ getFormMessage(form.fetchUrl, 'form', 'submit' ) }}
      </button>
    </fieldset>
  </form>
</template>
