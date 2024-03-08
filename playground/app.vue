<script setup lang="ts">
// const testForm = ref()
// watchEffect(() => {
//   if testForm.value.isReady()
//     testForm.value.submit()
// })
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormBuilder
      ref="testForm"
      action="https://httpbin.org/post"
    >
      <FormInput 
        name="asdf"
        :rules="[ 'isEmail']"
      />
      <FormInput label="" type="checkbox" name="tosnlpd" :rules="[{ equals: [true], message: 'coucou' }]" />
      <FormInput name="safs" :rules="['isNotEmpty']" />
      <FormTextarea name="saffs" :rules="['isNotEmpty']" />
      <FormRadio :options="{'O': 'Oui', 'N': 'Non'}" name="yo" laebl="Yo" />
      <FormRadio :options="{'O': 'Oui', 'N': 'Non'}" name="yos" label="Yos" :rules="['isNotEmpty']" :empty="true" />
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
