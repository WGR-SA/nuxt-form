<script lang="ts" setup>
import { useFormData } from '../composables/data'

interface FormInputContainerProps {
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
}

const props = defineProps<FormInputContainerProps>()
const { addField, setDefaultValue } = useFormData()

addField(({ name: props.name, rules: props.rules ?? [] }))
setDefaultValue(props)

const { v$ } = useFormData()
</script>

<template>
  <div :class="`form__input form__${type ?? 'default'} ${(rules?.includes('required')) ? 'form--required' : '' }`">
    <label :for="name">{{ label }}</label>
    <slot></slot>
    <p class="form__error" v-for="error of v$[name]?.$errors" :key="error.$uid">
      {{ error.$message }}
    </p>
  </div>
</template>