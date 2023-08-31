<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Form } from '#imports'

const form = inject('form') as Form
const errorMessage = computed(() => (['recaptcha', 'field_validation', 'unknown'].includes(form.state.errorType as string)) ? form.messages.get(`error.${form.state.errorType ?? 'unknown'}`) : form.state.errorType)
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
