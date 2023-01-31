<script lang="ts" setup>
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

// TO DO: Get Form instance and set default & validators

form.data.addField(({ name: props.name, rules: props.rules ?? [] }))
form.data.setDefaultValue(props)

const { v$ } = form.data.data.v$
</script>

<template>
  <div :class="`form__input form__${type ?? 'default'} ${(rules?.includes('required')) ? 'form--required' : '' }`">
    <label :for="name">{{ label }}</label>
    <slot />
    <p 
      v-for="error of v$[name]?.$errors" 
      :key="error.$uid" 
      class="form__error"
    >
      {{ error.$message }}
    </p>
  </div>
</template>
