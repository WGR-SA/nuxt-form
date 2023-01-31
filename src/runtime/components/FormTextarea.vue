<script lang="ts" setup>
import { computed } from 'vue'
import { useFormData } from '../composables/data'

const { state } = useFormData()
const props = defineProps<FormInput.Textarea>()
const required = computed(() => props.required ?? false)
const rows = computed(() => props.rows ?? 3)
</script>

<template>
  <FormInputContainer v-bind="props">
    <textarea v-model="state[name]" :required="required" :rows="rows" />
  </FormInputContainer>
</template>
