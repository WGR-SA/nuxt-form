<script lang="ts" setup>
import { provide } from 'vue'
import { useFormBuilder, FormModelFormatter } from '#imports'

const { initForm, submitForm } = useFormBuilder()

const config = defineProps<{ 
  action: string, 
  model: FormModel.EntityModel,
  profile?: string,
  method?: 'POST' | 'GET',
  headers?: { [key: string]: string }, 
  stringify?: boolean, 
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
}>()

const model = new FormModelFormatter(config.model)
const { form, validator } = initForm(config as FormBuilder.Props)

defineExpose(form)
provide('form', form)
provide('validator', validator)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="form.shown">
      <component
        :is="model.getInputComponent(field.type ?? 'text')"
        v-for="field in model.getFields(profile ?? 'base')"
        v-bind="field"
        :key="field.name"
      />
      <button 
        type="submit" 
        @click.prevent="submitForm(form, validator)"
      >
        {{ form.messages.get('submit') }}
      </button>
    </fieldset>
  </form>
</template>