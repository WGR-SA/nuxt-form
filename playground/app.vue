<script setup>
import { User } from './entities/User'

const loginForm = ref()
const userForm = ref()

watchEffect(async () => {
  if (loginForm.value?.ready()) {
    console.log('ready');
    const {data, error} = await loginForm.value.actions.submit()
    console.log(data, error);
  }

  if(userForm.value?.ready()){
    console.log('ready');
    const {data, error} = await userForm.value.actions.save()
    console.log(data, error);
  }
})

const newEntity = new User()
newEntity.email = 'test@test.ch'
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormGenerator 
      ref="userForm"
      action="https://httpbin.org/post"
      :model="User"
      :values="newEntity"
      profile="typeorm"
    />


    <FormBuilder ref="loginForm" action="https://httpbin.org/post">
      <FormInput name="username" label="Email" :rules="['required']" placeholder="email" />
      <FormInput name="password" type="password" label="Password" :rules="['required']" placeholder="password" />
      <FormSubmit>
        Login
      </FormSubmit>
    </FormBuilder>
  </div>
</template>
