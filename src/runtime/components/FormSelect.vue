<script lang="ts" setup>
import { computed } from 'vue'

// TO DO Props & Form instance & data

const props = defineProps<FormInput.Select>()
const required = computed(() => props.required ?? false)
</script>

<template>
  <FormInputContainer v-bind="props">
    <select v-model="state[name]" :required="required">
      <option v-for="(option, key) in options" :key="key" :value="key" :default="key == 0">
        {{ option }}
      </option>
    </select>
  </FormInputContainer>
</template>
