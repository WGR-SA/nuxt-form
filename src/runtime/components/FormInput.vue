<script lang="ts" setup>
import { computed } from 'vue'
import { useFormData } from '../composables/data'

const { state } = useFormData()
const props = defineProps<FormInput.Text>()
const type = computed(() => props.type ?? 'text')
</script>

<template>
  <FormInputContainer v-bind="props">
    <input v-model="state[name]" :type="type" v-bind:required="required" v-bind:placeholder="placeholder" v-bind:checked="checked">
  </FormInputContainer>
</template>
