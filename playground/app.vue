<script setup>
import { watchEffect } from 'vue'
import { useState } from '#app'

const selectOptions = {
  1: 'Option 1',
  2: 'Option 2',
  3: 'Option 3'
}

// watchEffect(() => {
//   console.log(formResponse.value)
// })

</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormBuilder url="https://httpbin.org/post">
      <FormInput name="email" label="Email" :rules="['email', 'required']" placeholder="Name" />
    </FormBuilder>

    <FormBuilder url="https://httpbin.org/post">
      <FormInput name="email" label="Name" :rules="['required']" placeholder="Name" />
    </FormBuilder>
  </div>
</template>
