<script lang="ts" setup>
import { computed } from 'vue'
import { useFormData } from '../composables/data';

import type { FormInputProps } from './FormInput.vue'

interface FormTextareaProps extends FormInputProps {
  name: string,
  rows?: number
}

const { state } = useFormData()
const props = defineProps<FormTextareaProps>()
const required = computed(() => props.required ?? false)
const rows = computed(() => props.rows ?? 3)
</script>

<template>
  <FormInputContainer v-bind="props">
    <textarea v-model="state[name]" :required="required" :rows="rows"></textarea>
  </FormInputContainer>
</template>
