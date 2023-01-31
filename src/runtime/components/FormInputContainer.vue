<script lang="ts" setup>
const props = defineProps<FormInput.Container>()

form.dataHandler.addField(({ name: props.name, rules: props.rules ?? [] }))
form.dataHandler.setDefaultValue(props)

const { v$ } = useFormData()
</script>

<template>
  <div :class="`form__input form__${type ?? 'default'} ${(rules?.includes('required')) ? 'form--required' : '' }`">
    <label :for="name">{{ label }}</label>
    <slot />
    <p v-for="error of v$[name]?.$errors" :key="error.$uid" class="form__error">
      {{ error.$message }}
    </p>
  </div>
</template>
