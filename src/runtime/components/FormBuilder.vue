<script lang="ts" setup>
import { provide } from 'vue'
import { useFormBuilder } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  action?: string, 
  submitter?: FormBuilder.FormSubmitter,
  messages?: Partial<FormBuilder.Messages>,
}>()

const form = initForm(config as FormBuilder.Props)

defineExpose(form)
provide('form', form)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset :hidden="!form.isShown">
      <slot />
    </fieldset>
  </form>
</template>
