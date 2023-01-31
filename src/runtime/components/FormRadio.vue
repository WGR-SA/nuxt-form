<script lang="ts" setup>
import { computed } from 'vue'

// TO DO Props & Form instance & data

const props = defineProps<FormInput.Radio>()
const required = computed(() => props.required ?? false)

</script>

<template>
  <FormInputContainer v-bind="props">
    <div v-for="(option, key) in options" :key="key" class="form__radio">
      <label :for="state[name]"> {{ option }} </label>
      <input v-model="state[name]" type="radio" :value="key" :required="required">
    </div>
  </FormInputContainer>
</template>
