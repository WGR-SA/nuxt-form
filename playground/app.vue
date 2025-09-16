<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const testForm = ref()

// Debug: Check what's exposed
onMounted(() => {
  console.log('testForm.value:', testForm.value)
  console.log('testForm.value.state:', testForm.value?.state)
  console.log('testForm.value.form:', testForm.value?.form)
  
  // Test reactivity
  watch(() => testForm.value?.state?.status, (status) => {
    console.log('Status changed:', status)
  }, { immediate: true })
})

</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormBuilder
      ref="testForm"
      action="https://httpbin.org/post"
    >
      <FormInput 
        name="asdf"
        type="date"
        :rules="[ {minDate: [new Date()]}]"
      />

      <FormSubmit>
        Submit 
      </FormSubmit>
    </FormBuilder>
  </div>
</template>

<style>
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  letter-spacing: 0.25px;
  font-size: 14px;
  line-height: 1.42857143;
  background-color: #fff;
  color: #333;
}
</style>
