<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue'
import { MaskInput } from "maska"
import { useRuntimeConfig } from '#app'
import { Form } from '#imports'

const props = defineProps<{ 
  name: string, 
  label: string, 
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
  value?: string, 
  placeholder?: string 
}>()

const form = inject('form') as Form
const formInput = ref()
const type = computed(() => props.type ?? 'text')

onMounted(() => {  
  if( useRuntimeConfig().form.mask ) {
    new MaskInput('[data-maska]', {
      tokens: {
        'A': { pattern: /[A-Z -]/,  transform: (str: string) => str.toLocaleUpperCase(), multiple: true },
      }
    })
  }
})
</script>

<template>
  <FormInputContainer v-bind="props">
    <input 
      ref="formInput"
      v-model="form.data.state[name]"
      :data-maska="mask"
      :type="type" 
      :required="required" 
      :placeholder="placeholder" 
      :checked="checked"
    >
    <FormSuggest 
      v-if="suggestions"
      :name="name"
      v-bind="suggestions"
    />
  </FormInputContainer>
</template>
