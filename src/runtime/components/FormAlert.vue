<script lang="ts" setup>
import { inject, computed } from 'vue'
import { FormInstance } from '#imports'

const form = inject('form') as FormInstance
const alertShown = computed(() => {
  return form.state.status !== 'idle' && form.state.status !== 'ready'
})
</script>

<template>
  <div 
    v-if="alertShown" 
    :class="`alert alert--${form.state.status}`"
  >
    <strong>{{ form.messages.get(`alert.${form.state.status}`) }}</strong><br>
    <span v-if="form.state.status == 'error'">
      {{ form.messages.get(`error.${form.state.errorType ?? 'unknown'}`) }}
    </span>
  </div>
</template>
