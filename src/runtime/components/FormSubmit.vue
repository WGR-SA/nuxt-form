<script lang="ts" setup>
import { inject } from 'vue'
import { FormInstance, useFormBuilder } from '#imports'

const { formReady } = useFormBuilder()
const form = inject('form') as FormInstance
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

