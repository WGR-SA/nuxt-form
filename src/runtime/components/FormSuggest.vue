<script lang="ts" setup>
import { inject } from 'vue'
import { Form } from '#imports'

const props = defineProps<{
  name: string,
  options: string[] | {[key: string]: string}
}>()

const form = inject('form') as Form
const inputMatchingOption = (option: string) => {
  return option.toLowerCase().includes(form.data.state[props.name].toLowerCase()) && form.data.state[props.name].length > 0 && form.data.state[props.name].toLowerCase() !== option.toLowerCase()
}
const setInputValue = (option: string) => {
  form.data.state[props.name] = option
}
</script>

<template>
  <ul class="form__suggest">
    <li 
      v-for="option in options"
      :key="option"
      :class="{'visible': inputMatchingOption(option)}"
      @click="setInputValue(option)"
    >
      {{ option }}
    </li>
  </ul>
</template>