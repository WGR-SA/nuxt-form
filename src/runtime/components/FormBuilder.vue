<script lang="ts" setup>
import { provide } from 'vue'
import { useFormBuilder } from '#imports'

const { initForm, submitForm } = useFormBuilder()

const config = defineProps<{ 
  action: string, 
  method?: 'POST' | 'GET',
  headers?: { [key: string]: string }, 
  stringify?: boolean, 
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
}>()

const { form, validator } = initForm(config as FormBuilder.Props)

defineExpose(form)
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
        {{ form.messages.get('submit') }}
      </button>
    </fieldset>
  </form>
</template>
