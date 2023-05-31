<script lang="ts" setup>
import { inject } from 'vue'
import { Form, useFormBuilder } from '#imports'

const { validateForm } = useFormBuilder()
const form = inject('form') as Form

const submit = () => {
  form.mutateState('validate')
  validateForm(form)
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

