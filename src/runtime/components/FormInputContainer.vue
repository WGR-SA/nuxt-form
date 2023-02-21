<script lang="ts" setup>
import { inject, computed, watch, onMounted } from 'vue'
import { Form, useFormValidator } from '#imports'

const props = defineProps<{
  name: string,
  label: string,
  rules?: Array<string | { [key: string]: string[] }>, 
  options?: { [key: string | number]: string },
  required?: boolean,
  checked?: boolean,
  value?: string,
  default?: string,
  type?: string,
  [key: string]: any
}>()
const { validateField } = useFormValidator()
const errors = computed(() => validateField(form, props.name))
const form = inject('form') as Form

form.addField(props)
</script>

<template>
  <div :class="`form__input form__${type ?? 'default'} ${(rules?.includes('isNotEmpty')) ? 'form--required' : '' }`">
    <label v-if="type !== 'hidden'" :for="name">{{ label }}</label>
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
