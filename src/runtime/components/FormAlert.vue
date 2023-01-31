<script lang="ts" setup>
import { useFormBuilder } from '#imports'
import { useFormMessage } from '#imports';

// TO DO: get form instance from useFormBuilder & create a computed property for the alert and error message
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
