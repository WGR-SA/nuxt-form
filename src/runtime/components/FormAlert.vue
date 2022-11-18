<script lang="ts" setup>
import { useFormBuilder } from '../composables/builder'

const { status, messages } = useFormBuilder()
</script>

<template>
  <div v-if="status !== 'idle'" :class="`alert alert--${status}`">
    {{ messages.alert[status] }}
    <span v-if="status === 'error'">
      {{ messages.error }}
    </span>
  </div>
</template> 