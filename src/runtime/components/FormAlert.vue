<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Form } from '#imports'

const form = inject('form') as Form
const isShown = computed(() => {
  return form.state.status !== 'idle' && form.state.status !== 'ready'
})
</script>

<template>
  <div 
    v-if="isShown" 
    :class="`alert alert--${form.state.status}`"
  >
    <strong>{{ form.messages.get(`alert.${form.state.status}`) }}</strong><br>
    <span v-if="form.state.status == 'error'">
      {{ form.messages.get(`error.${form.state.errorType ?? 'unknown'}`) }}
    </span>
  </div>
</template>
