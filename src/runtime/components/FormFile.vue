<script lang="ts" setup>
import { inject, ref } from 'vue'
import { Form } from '#imports'

const props = defineProps<{
  name: string,
  label: string,
  rules?: Array<string | { [key: string]: string[] }>,
  type?: string,
  accept?: string,
  required?: boolean,
  multiple?: boolean
}>()

const form = inject('form') as Form
const formInput = ref()
</script>

<template>
  <FormInputContainer v-bind="props">
    <input 
      ref="formInput" 
      type="file" 
      :required="required"
      :accept="accept"
      :multiple="multiple"
      @change="form.data.state[props.name] = formInput.files[0]"
    >
  </FormInputContainer>
</template>
