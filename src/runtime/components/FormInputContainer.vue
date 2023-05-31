<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Form, useFormValidator } from '#imports'

const props = defineProps<{
  name: string,
  label?: string,
  rules?: Array<string | { [key: string]: string[] }>, 
  options?: { [key: string | number]: string },
  required?: boolean,
  checked?: boolean,
  value?: string,
  default?: string,
  type?: string,
  [key: string]: any
}>()
const { getFieldErrors } = useFormValidator()
const form = inject('form') as Form
const errors = computed(() => getFieldErrors(form, props.name))

form.addField(props as FormInput.Container)
</script>

<template>
  <div :class="`form__input form__${type ?? 'default'} ${(rules?.includes('isNotEmpty') || props.required) ? 'form--required' : '' }`">
    <label 
      v-if="type !== 'hidden'" 
      :for="name"
    >
      {{ label ?? name }}
    </label>
    <slot />
    <p 
      v-for="(error, i) of errors" 
      :key="i" 
      class="form__error" 
    >
      {{ error }}
    </p>
  </div>
</template>
