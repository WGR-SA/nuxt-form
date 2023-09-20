# Nuxt-form

This Nuxt module is designed for creating and posting forms with an integrated builder, input components, and optional Recaptcha validation. Automatic field validation is included, thanks to the [class-validator](https://github.com/typestack/class-validator). Input data masking is also included with [maska](https://beholdr.github.io/maska).

## Examples
### Simple Login Form 

```VUE
<script lang="ts" setup>

</script>
<template>
  <FormBuilder action="https://httpbin.org/post">
    <FormInput name="username" label="Username" :rules="['isNotEmpty']"/>
    <FormInput name="email" label="Email" :rules="['isNotEmpty', 'isEmail']"/>
    <FormSubmit>
      Login
    </FormSubmit>  
  </FormBuilder>
</template>  

```