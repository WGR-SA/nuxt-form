<script lang="ts" setup>
import { provide } from 'vue'
import { useRuntimeConfig } from '#app'
import { useFormBuilder, FormModelFormatter, ModuleTypes } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  model: FormModel.Entity,
  action?: string,
  values?: any,
  layers?: string[],
  exclude?: string[],
  actions?: ModuleTypes.FormActions,
  messages?: Partial<FormBuilder.Messages>,
  lang?: string
}>()

const model = new FormModelFormatter(config.model, config.layers ?? useRuntimeConfig().public.form.format_layers)
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
      <template v-for="field in model.getFormInputs()">
        <component 
          :is="field.component ?? 'FormInput'" 
          v-if="exclude ? !exclude.includes(field.name) : true"
          :key="field.name" 
          v-bind="field" 
          :value="config.values ? config.values[field.name] : ''"
        />
      </template>
      <slot />
      <FormSubmit>
        {{ form.messages.get('submit') }}
      </FormSubmit>
    </fieldset>
  </form>
</template>