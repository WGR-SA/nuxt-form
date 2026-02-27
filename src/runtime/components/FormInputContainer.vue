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
  empty?: boolean,
  [key: string]: any
}>()
const { getFieldErrors } = useFormValidator()
const form = inject('form') as Form
const errors = computed(() => getFieldErrors(form, props.name))

let translateLabel = (label: string) => label
try {
  const { $i18n } = useNuxtApp()
  if ($i18n) {
    translateLabel = (label: string) => $i18n.te(label) ? $i18n.t(label) : label
  }
} catch {}

const translatedLabel = computed(() => {
  if (!props.label) return props.name
  return translateLabel(props.label)
})

form.addField(props as FormInput.Container)
</script>

<template>
  <div
    :class="`form__input form__${type ?? 'default'} ${(rules?.includes('isNotEmpty') || props.required) ? 'form--required' : '' }`">
    <label
      v-if="type !== 'hidden'"
      :for="name"
      v-html="translatedLabel"
    />
    <slot />
    <p v-for="(error, i) of errors" :key="i" class="form__error">
      {{ error }}
    </p>
  </div>
</template>
