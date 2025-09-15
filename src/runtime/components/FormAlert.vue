<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Form } from '#imports'

const form = inject('form') as Form
if (!form) {
  console.warn('FormAlert: No form provided. Make sure FormAlert is used inside FormBuilder.')
}
const errorMessage = computed(() => {
  const errorType = form.state.errorType as string
  if (['recaptcha', 'field_validation', 'unknown'].includes(errorType)) {
    try {
      return form.messages.get(`error.${errorType ?? 'unknown'}`)
    } catch {
      return errorType || 'Unknown error'
    }
  }
  return errorType || ''
})
const isShown = computed(() => form.state.status !== 'idle' && form.state.status !== 'ready')
</script>

<template>
  <div 
    v-if="isShown" 
    :class="`alert alert--${form.state.status}`"
  >
    <strong>{{ form.messages.get(`alert.${form.state.status}`) }}</strong><br>
    <span v-if="form.state.status == 'error'">
      {{ errorMessage }}
    </span>
  </div>
</template>
