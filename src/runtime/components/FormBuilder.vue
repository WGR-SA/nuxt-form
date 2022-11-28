<script lang="ts" setup>
import { useFormBuilder } from '../composables/builder'

interface FormBuilderProps {
  fetchUrl: URL,
  method?: 'POST' | 'GET',
  headers?: Object
}

const props = defineProps<FormBuilderProps>()
const formbuilder = useFormBuilder()
// const { showForm, getFormMessages, initForm, submitForm } = useFormBuilder()

//initForm(props.fetchUrl, props.method, props.headers)
</script>

<template>
  <form class="form">
    <!-- <FormAlert />
    <fieldset v-if="showForm">
      <slot></slot>
      <button type="submit" @click.prevent="submitForm">
        {{ getFormMessages.submit }}
      </button>
    </fieldset> -->
  </form>
</template>
