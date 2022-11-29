<script lang="ts" setup>
import { useFormBuilder } from '../composables/builder'

interface FormBuilderProps {
  fetchUrl: URL,
  method?: 'POST' | 'GET',
  headers?: Object
}

const props = defineProps<FormBuilderProps>()
const { showForm, formMessages, initForm, submitForm } = useFormBuilder()

initForm(props.fetchUrl, props.method, props.headers)
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset v-if="showForm">
      <slot></slot>
      <button type="submit" @click.prevent="submitForm">
        {{ formMessages.submit }}
      </button>
    </fieldset>
    
  </form>
</template>
