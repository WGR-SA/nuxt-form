<script lang="ts" setup>
import { computed, inject } from 'vue'
import { Form } from '#imports'

const props = defineProps<{
  name: string,
  label?: string,
  rules?: string[],
  type?: string,
  required?: boolean,
  checked?: boolean,
  value?: string,
  placeholder?: string,
  rows?: number,
}>()

const form = inject('form') as Form
const required = computed(() => props.required ?? false)
const rows = computed(() => props.rows ?? 3)
</script>

<template>
  <FormInputContainer v-bind="props">
    <textarea 
      v-model="form.data.state[name]" 
      :required="required" 
      :rows="rows" 
      :placeholder="placeholder" 
    />
  </FormInputContainer>
</template>
