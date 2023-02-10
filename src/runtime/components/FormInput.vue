<script lang="ts" setup>
import { computed, inject } from 'vue'
import { FormInstance } from '#imports'

const props = defineProps<{ 
  name: string, 
  label: string, 
  rules?: Array<string | {[key: string]: string[]}>, 
  type?: string, 
  required?: boolean, 
  checked?: boolean, 
  value?: string, 
  placeholder?: string 
}>()

const form = inject('form') as FormInstance
const type = computed(() => props.type ?? 'text')

</script>

<template>
  <FormInputContainer v-bind="props">
    <input 
      v-model="form.data.state[name]"
      :type="type" 
      :required="required" 
      :placeholder="placeholder" 
      :checked="checked"
    >
  </FormInputContainer>
</template>
