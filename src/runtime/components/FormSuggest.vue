<!-- eslint-disable vue/require-default-prop -->
<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { Form, useFetch } from '#imports'

const props = withDefaults(defineProps<{
  name: string,
  type?: 'list' | 'api',
  fetchUrl?: string,
  responsePath?: string,
  responseKey?: string,
  values?: string[] | { [key: string]: string } | string
}>(), { type: 'list' })

const form = inject('form') as Form
const choiceDone = ref(false)
const options = ref<unknown>(props.values ?? [])

if ( props.type === 'api' && props.fetchUrl) {
  watch(form.data.state, async () => {
    if(form.data.state[props.name].length < 3) return
    const { data } = await useFetch(String(props.fetchUrl), {
      key: props.fetchUrl,
      method: 'GET',
    })
    
    if(data.value) {
      // @ts-ignore
      options.value = props.responsePath ? data.value[props.responsePath] : data.value
    }
  })
} 

const inputMatchingOption = (option: string) => {
  if(props.type === 'api') return true
  return option.toLowerCase().includes(form.data.state[props.name].toLowerCase()) && form.data.state[props.name].length > 0 && form.data.state[props.name].toLowerCase() !== option.toLowerCase()
}
const setInputValue = (option: string) => {
  choiceDone.value = true
  form.data.state[props.name] = option
}
</script>

<template>
  <ul 
    v-if="choiceDone === false"
    class="form__suggest" 
  >
    <li 
      v-for="option in options"
      :key="option"
      :class="{'visible': inputMatchingOption(option)}"
      @click.prevent="setInputValue(responseKey ? option[responseKey] : option)"
    >
      {{ responseKey ? option[responseKey] : option }}
    </li>
  </ul>
</template>