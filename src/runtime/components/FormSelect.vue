<script lang="ts" setup>
import type { FormInputProps } from './FormInput.vue'

interface FormTextareaProps extends FormInputProps {
  options: { [key: string | number]: string }
}

const props = defineProps<FormTextareaProps>()
</script>

<template>
  <FormInputContainer>
    <select :name="inputname" :value="value ?? ''" :required="required">
      <option v-for="(option, key) in options" :value="key">
        {{ option }}
      </option>
    </select>
  </FormInputContainer>
</template>
