<script lang="ts" setup>
import type { FormInputProps } from './FormInput.vue'

interface FormTextareaProps extends FormInputProps {
  rows?: number
}

const props = defineProps<FormTextareaProps>()
</script>

<template>
  <FormInputContainer>
    <textarea :name="inputname" :value="value ?? ''" :required="required" :rows="rows ?? 5">
      {{ placeholder }}
    </textarea>
  </FormInputContainer>
</template>
