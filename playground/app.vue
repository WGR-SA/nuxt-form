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
    const {data, error} = await userForm.value.actions.submit()
    console.log(data, error);
  }
})

const newEntity = new User()
newEntity.email = 'test@test.ch'
//newEntity.firstName = 'John'
newEntity.lastName = 'Doe'
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormGenerator 
      ref="userForm"
      action="https://httpbin.org/post"
      :model="User"
      :values="newEntity"
      :layers="['typeorm', 'class-validator', 'form']"
      :messages="{ submit: 'Register' }"
    />

    <FormBuilder 
      ref="loginForm" 
      action="https://httpbin.org/posts" 
      :messages="{ alert: { submitted: 'Vous vous êtes bien connecté' } }"
    >
      <FormInput 
        name="username" 
        label="Email"
        :required="true"
        :rules="['isEmail', 'isNotEmpty']" 
        placeholder="email" 
      />
      <FormInput 
        name="password" 
        type="password" 
        label="Password" 
        placeholder="password" 
      />
      <FormSubmit>
        Login
      </FormSubmit>
    </FormBuilder>
  </div>
</template>
