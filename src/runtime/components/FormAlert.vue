<script lang="ts" setup>
import { computed } from 'vue'
import { useFormBuilder } from '../composables/builder'

const formBuilder = useFormBuilder()
const status = formBuilder.getFormStatus
const messages = formBuilder.getFormMessages

const alert = computed<string>(() => messages.value.alert[status as unknown as keyof typeof messages.value.alert])
</script>

<template>
  <div v-if="status !== 'idle'" :class="`alert alert--${status}`">
    {{ alert }}
    <span v-if="status == 'error'">
      {{ messages.error }}
    </span>
  </div>
</template> 