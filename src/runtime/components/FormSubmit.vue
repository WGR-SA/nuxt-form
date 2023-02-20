<script lang="ts" setup>
import { inject } from 'vue'
import { Form, useFormBuilder } from '#imports'

const { formReady } = useFormBuilder()
const form = inject('form') as Form
const validator = inject('validator')

const submit = () => {
  formReady(form, validator)
}
</script>

<template>
  <button 
    type="submit" 
    @click.prevent="submit"
  >
    <slot />
  </button>
</template>

