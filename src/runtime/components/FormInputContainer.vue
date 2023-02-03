<script lang="ts" setup>
import { inject } from 'vue'
import { FormInstance } from '#imports'

const props = defineProps<{
  name: string,
  label: string,
  rules?: string[],
  options?: { [key: string | number]: string },
  required?: boolean,
  checked?: boolean,
  value?: string,
  default?: string,
  type?: string,
  [key: string]: any
}>()

const form = inject('form') as FormInstance
const validator = inject('validator') as any

form.data.addField(({ name: props.name, rules: props.rules ?? [] }))
form.data.setDefaultValue(props)

</script>

<template>
  <div :class="`form__input form__${type ?? 'default'} ${(rules?.includes('required')) ? 'form--required' : '' }`">
    <label :for="name">{{ label }}</label>
    <slot />
    <p 
      v-for="error of validator[name]?.$errors" 
      :key="error.$uid" 
      class="form__error" 
    >
      {{ error.$message }}
    </p>
  </div>
</template>
