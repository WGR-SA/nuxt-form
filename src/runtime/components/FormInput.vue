<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  name: string,
  label: string,
  rules?: string[],
  type?: string,
  required?: boolean,
  checked?: boolean,
  value?: string,
  placeholder?: string,
}>()
const type = computed(() => props.type ?? 'text')

// TODO: Get Form instance to get data
</script>

<template>
  <FormInputContainer v-bind="props">
    <input 
      v-model="state[name]" 
      :type="type" 
      :required="required" 
      :placeholder="placeholder" 
      :checked="checked"
    >
  </FormInputContainer>
</template>
