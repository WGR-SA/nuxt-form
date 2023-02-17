<script lang="ts" setup>
import { provide } from 'vue'
import { UseFetchOptions } from '#app'
import { useFormBuilder, FormModelFormatter } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  action: string, 
  model: FormModel.EntityModel,
  values?: any,
  profile?: string,
  process?: FormActions.methods,
  actions?: FormActions.Actions<unknown>,
  fetchOptions?: UseFetchOptions<unknown>,
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
}>()

const model = new FormModelFormatter(config.model, config.profile ?? 'base')
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
        :is="model.getInputComponent(field.type)" 
        v-for="field in model.getFields()" 
        :key="field.name" 
        v-bind="field" 
        :value="config.values[field.name]"
      />
      <FormSubmit>
        {{ form.messages.get('submit') }}
      </FormSubmit>
    </fieldset>
  </form>
</template>