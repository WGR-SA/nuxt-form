<script lang="ts" setup>
import { computed } from 'vue'
import { useFormData } from '../composables/data'

export interface FormInputProps {
  name: string,
  label: string,
  rules?: string[],
  type?: string,
  required?: boolean,
  checked?: boolean,
  value?: string,
  placeholder?: string,
}

const { state } = useFormData()
const props = defineProps<FormInputProps>()
const type = computed(() => props.type ?? 'text')
</script>

<template>
  <FormInputContainer v-bind="props">
    <input v-model="state[name]" :type="type" v-bind:required="required" v-bind:placeholder="placeholder" v-bind:checked="checked">
  </FormInputContainer>
</template>
