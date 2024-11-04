<script lang="ts" setup>
import { computed, inject } from 'vue'
import { Form } from '#imports'

const props = defineProps<{
  name: string,
  label?: string,
  options: { [key: string | number]: string }
  rules?: string[],
  type?: string,
  required?: boolean,
  multiple?: boolean,
  checked?: boolean,
  disabled?: boolean,
  value?: string,
  placeholder?: string,
  empty?: string,
}>()

const form = inject('form') as Form
const required = computed(() => props.required ?? false)
</script>

<template>
  <FormInputContainer v-bind="props">
    <select 
      v-model="form.data.state[name]" 
      :required="required"
      :disabled="disabled"
      :multiple="multiple"
    >
      <option v-if="empty" disabled selected value="">{{ empty }}</option>
      <option 
        v-for="(option, key) in options" 
        :key="key" 
        :value="key" 
        :default="key == 0"
      >
        {{ option }}
      </option>
    </select>
  </FormInputContainer>
</template>
