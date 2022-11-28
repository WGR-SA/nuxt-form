<script setup>
</script>

<template>
  <div>
    <FormBuilder fetchUrl="http://locahost:8888">
      <FormInput name="name" label="Name" :rules="['required']"></FormInput>
    </FormBuilder>
  </div>
</template>

