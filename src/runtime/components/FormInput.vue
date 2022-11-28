<script lang="ts" setup>
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
</script>

<template>
  <FormInputContainer v-bind="props">
    <input :name="name" :value="value ?? ''" :required="required" :type="type ?? 'text'" :placeholder="placeholder">
  </FormInputContainer>
</template>
