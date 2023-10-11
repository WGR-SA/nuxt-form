<script lang="ts" setup>
import { provide, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import { useFormBuilder, FormModelFormatter, ModuleTypes } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  model: FormModel.Entity,
  action?: string,
  submitter?: ModuleTypes.FormSubmitter,
  values?: any,
  layers?: string[],
  exclude?: string[],
  messages?: Partial<FormBuilder.Messages>,
}>()

const model = new FormModelFormatter(config.model, config.layers ?? useRuntimeConfig().public.form.format_layers)
const form = initForm(config as FormBuilder.Props)
const fields = model.getFormInputs()

onMounted(() => {  
  // Set initial values
  Object.keys(config.values ?? {}).forEach(key => {
    if( config.values[key] && config.values[key].length > 0 )
    {
      form.data.state[key] = config.values[key]
    }
  })    
})

defineExpose(form)
provide('form', form)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset :hidden="!form.isShown">
      <template v-for="field in fields">
        <component 
          :is="field.component ?? 'FormInput'" 
          v-if="exclude ? !exclude.includes(field.name) : true"
          :key="field.name" 
          v-bind="field"
        />
      </template>
      <slot />
    </fieldset>
  </form>
</template>