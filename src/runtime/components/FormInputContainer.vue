<script lang="ts" setup>
import { useFormData } from '../composables/data'

interface FormInputContainerProps {
  name: string,
  label: string,
  rules?: string[],
  [key: string]: any
}

const props = defineProps<FormInputContainerProps>()
const { v$, addField } = useFormData()

addField(({ name: props.name, rules: props.rules ?? [] }))
</script>

<template>
  <div class="form__input">
    <label :for="name">{{ label }}</label>
    <slot></slot>
    <p class="form__error" v-for="error of v$[name].$errors" :key="error.$uid">
      {{ error.$message }}
    </p>
  </div>
</template>