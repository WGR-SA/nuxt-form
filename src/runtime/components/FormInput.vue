<script lang="ts" setup>
import { useFormData } from '../composables/data';
export interface FormInputProps {
  name: string,
  label: string,
  rules?: string[],
  type?: string,
  required?: boolean,
  placeholder?: string,
  value?: string,
}

const props = defineProps<FormInputProps>()
const { state } = useFormData()
</script>

<template>
  <FormInputContainer v-bind="props">
    <input v-model="state[name]" :name="name" :required="required" :type="type ?? 'text'" :placeholder="placeholder">
  </FormInputContainer>
</template>
