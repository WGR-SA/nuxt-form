<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { Form, useFormBuilder } from '#imports'

const props = defineProps<{ validateOnly?: boolean }>()

const { validateForm } = useFormBuilder()
const form = inject('form') as Form

const submit = async () => {
  form.mutateState('validate')
  const isReady = await validateForm(form)
  if(isReady && !props.validateOnly) {
    form.submit()
  }
}

onMounted(() => {
  document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      submit()
    }
  });
})

</script>

<template>
  <button 
    type="submit" 
    @click.prevent="submit"
  >
    <slot />
  </button>
</template>

