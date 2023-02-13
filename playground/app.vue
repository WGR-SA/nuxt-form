<script setup>
// const loginForm = ref()

// watchEffect(() => {
//   if (loginForm.value?.response) {
//     console.log(loginForm.value?.response)
//   }
// })

import { User } from './entities/User'
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormGenerator 
      action="https://httpbin.org/post"
      :model="User"
      profile="typeorm"
    />
    <!-- <FormBuilder action="https://httpbin.org/post">
      <FormInput name="email" label="Email" :rules="['email', 'required', {'minLength': [10]}]" placeholder="Name" />
    </FormBuilder>

    <FormBuilder ref="loginForm" action="https://httpbin.org/post">
      <FormInput name="username" label="Email" :rules="['required']" placeholder="email" />
      <FormInput name="password" type="password" label="Password" :rules="['required']" placeholder="password" />
    </FormBuilder> -->
  </div>
</template>
