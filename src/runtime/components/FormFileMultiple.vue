<script lang="ts" setup>
import { inject, ref } from 'vue'
import { Form } from '#imports'

const props = defineProps<{
  name: string,
  label?: string,
  rules?: Array<string | { [key: string]: string[] }>,
  type?: string,
  accept?: string,
  required?: boolean,
  readonly?: boolean,
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
      v-bind:required="required || undefined"
      :accept="accept"
      v-bind:multiple="multiple || undefined"
      v-bind:readonly="readonly || undefined"
      @change="form.data.state[props.name] = Array.from(formInput.files)"
    >
  </FormInputContainer>
</template>
