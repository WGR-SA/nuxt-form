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
  checked?: boolean,
  value?: string,
  placeholder?: string,
  default?: string
}>()

const form = inject('form') as Form
const required = computed(() => props.required ?? false)

</script>

<template>
  <FormInputContainer v-bind="props">
    <div 
      v-for="(option, key) in options" 
      :key="key" 
      class="form__radio"
    >
      <label :for="form.data.state[name]"> {{ option }} </label>
      <input 
        v-model="form.data.state[name]" 
        type="radio" 
        :value="key" 
        v-bind:required="required || undefined"
      >
    </div>
  </FormInputContainer>
</template>
