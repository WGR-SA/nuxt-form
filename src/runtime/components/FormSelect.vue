<script lang="ts" setup>
import { computed, inject } from 'vue'
import { FormInstance } from '#imports'

const props = defineProps<{
  name: string,
  label: string,
  options: { [key: string | number]: string }
  rules?: string[],
  type?: string,
  required?: boolean,
  checked?: boolean,
  value?: string,
  placeholder?: string,
}>()

const form = inject('form') as FormInstance
const required = computed(() => props.required ?? false)
</script>

<template>
  <FormInputContainer v-bind="props">
    <select 
      v-model="form.data.state[name]" 
      :required="required"
    >
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
