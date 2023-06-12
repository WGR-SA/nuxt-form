# Validation
Nuxt-form comes with a built-in field validation system. It utilizes [class-validator](https://github.com/typestack/class-validator) to validate data. Check the [documentation](https://github.com/typestack/class-validator#validation-decorators)  for all validation possibilities. To use it, add the `rules` attribute to input components and fill it with the validation function name. Validation error messages will appear under the input field.

#### Example

```VUE
<FormInput 
  name="fieldname"
  :rules="['isEmail', {minLength: [3]}]"
/>
```

## Triggering Validation

While some validations are triggered on input changes, others need to be activated by a validation method. There are two ways to trigger this:

- **`FormSubmit` component** This component has a built-in validate method. Add it to your form to trigger form validation. If the validation is successful, the form status will change to `ready`, at which point you can send data or perform any necessary actions.
```VUE
<script lang="ts" setup>
const addForm = ref()

watchEffect(() => {
  if (addForm.value?.isReady()) {
    addForm.value?.actions.submit() // See Actions
  }
})
</script>
<template>
  <FormBuilder ref="addForm" action="#">
    ...
    <FormSubmit>Send</FormSubmit>  
  </FormBuilder>
</template>

```

- **Manual validation** If you want to trigger validation manually, you can import the `validateForm` method from the `useFormBuilder` omposable and validate whenever you want. For example:

```VUE
<script lang="ts" setup>
  const addForm = ref()
  const { validateForm } = useFormBuilder()

  const submit = () => {
    const form = addForm.value
    if(await validateForm(form)) {
      form.actions.submit() // See Actions
    }
      
  }
</script>
<template>
  <FormBuilder ref="addForm">
    ...
    <button @click.prevent="submit">
      Send
    </button>  
  </FormBuilder>
</template>
```

Refer to the [Actions](/guide/actions.html) section to learn about using the provided actions methods for sending data.