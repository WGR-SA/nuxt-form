<script setup>
const loginForm = ref()

watchEffect(() => {
  if (loginForm.value?.response) {
    console.log(loginForm.value?.response)
  }
})
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormBuilder action="https://httpbin.org/post">
      <FormInput name="email" label="Email" :rules="['email', 'required']" placeholder="Name" />
    </FormBuilder>

    <FormBuilder ref="loginForm" action="https://httpbin.org/post">
      <FormInput name="username" label="Email" :rules="['required']" placeholder="email" />
      <FormInput name="password" type="password" label="Password" :rules="['required']" placeholder="password" />
    </FormBuilder>
  </div>
</template>
