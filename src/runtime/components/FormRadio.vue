<script lang="ts" setup>
import { computed } from 'vue'
import { useFormData } from '../composables/data';

import type { FormInputProps } from './FormInput.vue'

interface FormRadioProps extends FormInputProps {
  name: string,
  options: { [key: string | number]: string }
  default?: string
}

const { state } = useFormData()
const props = defineProps<FormRadioProps>()
const required = computed(() => props.required ?? false)

</script>

<template>
  <FormInputContainer v-bind="props">
    <div class="form__radio"  v-for="(option, key) in options" :key="key">
      <input type="radio" v-model="state[name]" :value="key" :required="required" />
      <label :for="state[name]"> {{ option }} </label>
    </div>
  </FormInputContainer>
</template>
