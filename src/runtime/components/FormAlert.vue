<script lang="ts" setup>
import { inject, computed } from 'vue'
import { FormInstance, useFormMessage } from '#imports'

const { getFormMessage } = useFormMessage() 

const form = inject('form') as FormInstance
const alert = computed(() => getFormMessage(form.fetchUrl, 'form', `alert.${form.state.status}`))
const error = computed(() => getFormMessage(form.fetchUrl, 'form', `alert.${form.state.errorType ?? 'unknown'}`))
</script>

<template>
  <div 
    v-if="form.state.status !== 'idle'" 
    :class="`alert alert--${form.state.status}`"
  >
    <strong>{{ alert }}</strong><br>
    <span v-if="form.state.status == 'error'">
      {{ error }}
    </span>
  </div>
</template>
