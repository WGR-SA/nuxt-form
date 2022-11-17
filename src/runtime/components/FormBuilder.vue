<script lang="ts" setup>
import { useFormBuilder } from '../composables/builder'

export interface FormBuilderProps {
  method: 'POST' | 'GET',
  fetchUrl: URL,
  headers?: Object
}

const props = defineProps<FormBuilderProps>()
const { status, labels, send } = useFormBuilder()
</script>

<template>
  <form action="">
    <fieldset>
      <slot />
    </fieldset>
    <button type="submit" @click.prevent="send">
      {{ labels.submit }}
    </button>
  </form>
</template>
