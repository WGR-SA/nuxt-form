<script lang="ts" setup>
import { provide } from 'vue'
import { UseFetchOptions } from '#app'
import { useFormBuilder } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  action: string, 
  process?: FormActionsMethods,
  actions?: FormActions<unknown>,
  fetchOptions?: UseFetchOptions<unknown>,
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
}>()

const form = initForm(config as FormBuilder.Props)

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
