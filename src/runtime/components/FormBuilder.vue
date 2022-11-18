<script lang="ts" setup>
import { computed } from 'vue'
import { useFormBuilder } from '../composables/builder'

interface FormBuilderProps {
  fetchUrl: URL,
  method?: 'POST' | 'GET',
  headers?: Object
}

const props = defineProps<FormBuilderProps>()
const { status, messages, initForm, submit } = useFormBuilder()
const inputShown = computed(() => status.value === 'idle' || status.value === 'error')

initForm(props.fetchUrl, props.method, props.headers)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="inputShown">
      <slot />
      <button type="submit" @click.prevent="submit">
        {{ messages.submit }}
      </button>
    </fieldset>
  </form>
</template>
