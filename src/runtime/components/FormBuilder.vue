<script lang="ts" setup>
import { provide } from 'vue'
import { useRuntimeConfig } from '#app'
import { useFormBuilder, ModuleTypes } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  action?: string, 
  actions?: ModuleTypes.FormActions,
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
}>()

const form = initForm(config as FormBuilder.Props)

// Update messages from builder config
form.messages.updateFormMessages(useRuntimeConfig().public.form.lang, config.messages ?? {})

defineExpose(form)
provide('form', form)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="form.shown">
      <slot />
    </fieldset>
  </form>
</template>
