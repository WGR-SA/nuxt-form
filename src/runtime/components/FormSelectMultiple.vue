<script lang="ts" setup>
import { computed } from 'vue'
import { useFormData } from '../composables/data'

import type { FormInputProps } from './FormInput.vue'

interface FormSelectProps extends FormInputProps {
  name: string,
  options: { [key: string | number]: string }
}

const { state } = useFormData()
const props = defineProps<FormSelectProps>()
const required = computed(() => props.required ?? false)
</script>

<template>
  <FormInputContainer v-bind="props">
    <select v-model="state[name]" multiple :required="required">
      <option v-for="(option, key) in options" :key="key" :value="key" :default="key == 0">
        {{ option }}
      </option>
    </select>
  </FormInputContainer>
</template>
