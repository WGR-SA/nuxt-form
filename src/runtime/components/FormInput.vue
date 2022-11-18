<script lang="ts" setup>
export type FormInputProps = {
  inputname: string,
  label: string,
  rules?: any[],
  type?: string,
  required?: boolean,
  placeholder?: string,
  value?: string,
}

const props = defineProps<FormInputProps>()
</script>

<template>
  <FormInputContainer>
    <input :name="inputname" :type="type ?? 'text'" :placeholder="placeholder ?? ''" :value="value ?? ''" :required="required">
  </FormInputContainer>
</template>
