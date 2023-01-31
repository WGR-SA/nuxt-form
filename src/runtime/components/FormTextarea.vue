<script lang="ts" setup>
import { computed } from 'vue'

// TO DO Props & Form instance & data

const props = defineProps<FormInput.Textarea>()
const required = computed(() => props.required ?? false)
const rows = computed(() => props.rows ?? 3)
</script>

<template>
  <FormInputContainer v-bind="props">
    <textarea 
      v-model="state[name]" 
      :required="required" 
      :rows="rows" 
    />
  </FormInputContainer>
</template>
