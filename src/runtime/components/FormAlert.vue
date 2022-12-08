<script lang="ts" setup>
import { computed } from 'vue'
import { useFormBuilder } from '../composables/builder'

const { formState, formMessages } = useFormBuilder()
const alert = computed<string>(() => formMessages.value.alert[formState.value.status as keyof typeof formMessages.value.alert])
const error = computed<string>(() => formMessages.value.error[formState.value.errorType as keyof typeof formMessages.value.error])
</script>

<template>
  <div v-if="formState.status !== 'idle'" :class="`alert alert--${formState.status}`">
    <strong>{{ alert }}</strong><br>
    <span v-if="formState.status == 'error'">
      {{ error }}
    </span>
  </div>
</template>
