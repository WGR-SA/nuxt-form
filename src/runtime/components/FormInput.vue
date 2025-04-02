<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { MaskInput } from "maska"
import { useRuntimeConfig } from '#app'
import { Form } from '#imports'

const props = defineProps<{ 
  name: string, 
  label?: string, 
  rules?: Array<string | {[key: string]: string[]}>, 
  type?: string, 
  mask?: string,
  suggestions?: {
    type?: 'list' | 'api' | 'custom',
    fetchUrl?: string,
    responsePath?: string,
    responseKey?: string,
    values?: string[] | { [key: string]: string } | string
  },
  tokens?: {[key: string]: string},
  required?: boolean, 
  checked?: boolean, 
  disabled?: boolean,
  readonly?: boolean,
  min?: number,
  max?: number,
  value?: string, 
  placeholder?: string 
}>()

const form = inject('form') as Form
const formInput = ref()
const type = computed(() => props.type ?? 'text')

onMounted(() => {  
  if (useRuntimeConfig().public.form.mask) {
    setTimeout(() => {      
      new MaskInput('[data-maska]', {
        tokens: {
          'A': { pattern: /[A-Z -]/, transform: (str: string) => str.toLocaleUpperCase(), multiple: true },
        }
      })
    }, 1000)
  }
})
</script>

<template>
  <FormInputContainer v-bind="props">
    <input 
      :id="name"
      ref="formInput"
      v-model="form.data.state[name]"
      :data-maska="mask"
      :type="type" 
      v-bind:required="required || undefined" 
      v-bind:disabled="disabled || undefined"
      v-bind:readonly="readonly || undefined"
      :placeholder="placeholder" 
      :min="min"
      :max="max"
      :checked="checked"
      :list="suggestions ? `${name}-list` : undefined"
    >
    <FormSuggest 
      v-if="suggestions"
      :name="name"
      v-bind="suggestions"
    />
  </FormInputContainer>
</template>
