<script setup>
</script>

<template>
  <div>
    <FormBuilder fetchUrl="http://locahost:8888">
      <FormInput name="firstname" label="Name" :rules="['required']" />
      <FormInput name="email" label="Email" :rules="['required', 'email']" />
    </FormBuilder>
  </div>
</template>

