<script setup>
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormBuilder action="https://httpbin.org/post">
      <FormInput 
        name="email" 
        label="Email" 
        :rules="['email', 'required']" 
        placeholder="Name" 
      />
    </FormBuilder>

    <FormBuilder action="https://httpbin.org/post">
      <FormInput 
        name="email" 
        label="Name"   
        :rules="['required']" 
        placeholder="Name" 
      />
    </FormBuilder>
  </div>
</template>
