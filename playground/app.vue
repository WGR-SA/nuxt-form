<script setup>
const selectOptions = {
  1: 'Option 1',
  2: 'Option 2',
  3: 'Option 3',
}
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormBuilder fetchUrl="http://locahost:8888">
      <FormInput name="firstname" label="Name" :rules="['required']" placeholder="Name" />
      <FormInput name="email" label="Email" :rules="['required', 'email']" />
      <FormSelect name="seletctest" label="Select" :rules="['required']" :options="selectOptions" />
      <FormTextarea name="message" label="Message" :rules="['required']" /> 
      <FormInput name="check" type="checkbox" label="checkbox active" :checked="true"/>
      <FormInput name="checkin" type="checkbox" label="checkbox inactive"/>
      <FormInput name="date" type="date" label="date" />
      <FormInput name="time" type="time" label="date" />
      <FormInput name="datetime" type="datetime-local" label="date" />
      <FormRadio name="radiotext" label="Radio test" default="2" :options="selectOptions" />
      <FormRadio name="radiotext3" label="Radio test" :options="selectOptions" />
    </FormBuilder>  
  </div>
</template>

