<script lang="ts" setup>
import { inject } from 'vue'
import { Form, useFormBuilder } from '#imports'

const { formReady } = useFormBuilder()
const form = inject('form') as Form

const submit = () => {
  formReady(form)
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

