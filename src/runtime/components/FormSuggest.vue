<!-- eslint-disable vue/require-default-prop -->
<script lang="ts" setup>
import { inject, ref, watch } from 'vue'
import { Form, useFetch } from '#imports'

const props = withDefaults(defineProps<{
  name: string,
  type?: 'list' | 'api' | 'custom',
  fetchUrl?: string,
  headers?: { [key: string]: string },
  responsePath?: string,
  responseKey?: string,
  values?: string[] | { [key: string]: string } | string
}>(), { type: 'list' })

const form = inject('form') as Form
const options = ref<unknown>(props.values ?? [])

if ( props.type === 'api' && props.fetchUrl ) {
  watch(form.data.state, async () => {
    if(form.data.state[props.name].length < 2) return
    const { data } = await useFetch(String(props.fetchUrl), {
      key: props.fetchUrl,
      method: 'GET',
      ...props.headers,
    })

    if(data.value) {
      // @ts-ignore
      options.value = props.responsePath ? data.value[props.responsePath] : data.value
    }
  })
} 
</script>

<template>
  <datalist :id="`${name}-list`">
    <option
      v-for="(option, i) in options"
      :key="i"
      :value="responseKey ? option[responseKey] : option"
    >
      {{ responseKey ? option[responseKey] : option }}
    </option>
  </datalist>
</template>