<script lang="ts" setup>
import { computed } from 'vue'
import { useFormBuilder } from '../composables/builder'

const { formState, formMessages } = useFormBuilder()
const alert = computed<string>(() => formMessages.value.alert[formState.value.status as unknown as keyof typeof formMessages.value.alert])
const error = computed<string>(() => formMessages.value.error[formState.value.errorType as unknown as keyof typeof formMessages.value.error])
</script>

<template>
  <div v-if="formState.status !== 'idle'" :class="`alert alert--${formState.status}`">
    {{ alert }}
    <span v-if="formState.status == 'error'">
      {{ error }}
    </span>
  </div>
</template> 