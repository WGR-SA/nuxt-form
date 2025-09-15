<script lang="ts" setup>
import { provide, nextTick, onMounted } from 'vue'
import { useFormBuilder } from '#imports'

const { initForm } = useFormBuilder()

const config = defineProps<{ 
  action?: string, 
  submitter?: FormBuilder.FormSubmitter,
  messages?: Partial<FormBuilder.Messages>,
}>()

const form = initForm(config as FormBuilder.Props)

defineExpose(form)
provide('form', form)

// Ensure form state is properly initialized after dynamic mounting
onMounted(() => {
  nextTick(() => {
    if (form.state.status === 'idle') {
      // Force reactivity update
      form.mutateState('idle')
    }
  })
})
</script>

<template>
  <form class="form">
    <FormAlert />
    <fieldset :hidden="!form.isShown">
      <slot />
    </fieldset>
  </form>
</template>
