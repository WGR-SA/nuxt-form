<script lang="ts" setup>
import { inject } from 'vue'
import { FormInstance } from '#imports'

const form = inject('form') as FormInstance
</script>

<template>
  <div 
    v-if="form.state.status !== 'idle'" 
    :class="`alert alert--${form.state.status}`"
  >
    <strong>{{ form.messages.get(`alert.${form.state.status}`) }}</strong><br>
    <span v-if="form.state.status == 'error'">
      {{ form.messages.get(`error.${form.state.errorType ?? 'unknown'}`) }}
    </span>
  </div>
</template>
