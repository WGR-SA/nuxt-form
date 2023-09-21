# Builder

There are two methods for building a form. The first one uses the [`FormBuilder`](#formbuilder) component for manual input form setup. The other uses the [`FormGenerator`](#formgenerator) for automatic input generation from a [Model](/guide/model.html). 

## `FormBuilder`

### Props 
- `action` An optional default callback for the action HTML form attribute.
- `submitter` Optional custom `FormSubmitter`. See [Submit](/guide/submit.html) for details.
- `messages` Optional custom messages options. See [Messages](#messages) for details.

### Example

``` VUE
<FormBuilder action="#" messages="{ submit: 'Envoyer' }">
  <FormInput name="name" label="Name" />
  <FormInput name="email" label="Email" :rules="['isNotEmpty', 'isEmail']" />
  <FormSubmit>
    Send
  </FormSubmit>
</FormBuilder>
```

## `FormGenerator`

`FormGenerator` uses a model to automatically generate form inputs. See [Model](/guide/model.html) for details

### Props
- `model` A class model for generating a form. The structure depends on the layers option. See [Model](/guide/model.html)
- `action` An optional default callback for the action HTML form attribute.
- `submitter` Optional custom `FormSubmitter`. See [Submit](/guide/submit.html) for details.
- `values` Optional key-value object for existing form data.
- `layers` Optional list of layers. See [`ModeFormatter`](/guide/model.html#modelformatter)
- `exclude` Optional list of keys to exclude from the model for generation.
- `messages` Optional custom messages options. See [Messages](#messages)

### Example

```VUE
<FormGenerator
  ref="userForm"
  action="https://httpbin.org/post"
  :model="model"
/>
```

## Access Form Methods

`FormBuilder` and `FormGenerator` expose a form class that provides some methods to handle data or errors, for example.

You can access it by adding a ref to the component.

```VUE
<script lang="ts" setup>
  const someForm = ref()
</script>
<template>
  <FormGenerator ref="someForm"/>
</template>
```

Here's a list of methods you can use from the `Form` class:
- `isReady`: Return true or false if the form has passed all validation and is ready to submit
- `submit`: Form submit method. An exemple of use is if `validate-only` is set on `FormSubmit`
```VUE
<script lang="ts" setup>
  const someForm = ref()
  watchEffect(() => {
    if (someForm.value?.isReady()) someForm.value?.submit()
  })
</script>
<template>
  <FormBuiler ref="someForm">
    <FormInput ...>
    <FormSubmit validate-only="true"> Submit </FormSubmit>
  </FormBuilder>
</template>
```
- `addCustomData(key: string, value: string)`: Add custom data to the form.
```VUE
<script lang="ts" setup>
const someForm = ref()
someForm.value?.data.addCustomData('key', 'value')
</script>
``` 
- `mutateState(status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string)`:
Change form state. **This only works if used inside `FormSubmitter`** See [Submit](/guide/submit.html) for details.
```TS
...
onRequest: () => {
  this.form.mutateState('submitting')
},
...
``` 

## Form State

Form state keeps track of the status of the form. The form statuses are:

- `idle` The default status.
- `ready` All validations have passed, and the form is ready to send data.
- `submitting` Sending in progress. **All inputs are hidden, and an alert is displayed.**
- `submitted` The form has been sent. **All inputs are hidden, and an alert is displayed.**
- `error` The form encountered a problem. **An error message is displayed.**

When using the `mutateState` method to change the form status, a second parameter is required when the status is set to error. These error types include:
- `recaptcha` Automatic Recaptcha error message.
- `field_validation` Automatic field validation error message.
- `unknown` Automatic unknown error message.
- `[custom]` Directly type custom error message if needed.

See [Messages](#messages) section to customize these.

## Messages

Form builders use an instance of `FormBuilder.Messages` class to display alerts and errors.

To change these messages, you can add them in the module options or in the builder component. This will erase the default message and display your custom messages. The structure of messages is as follows. Add the ones that you want to change, there's no need to keep the full structure.

```TS
submit: 'Submit',
alert: {
  idle: 'Your form is ready',
  submitting: 'Submitting...',
  submitted: 'Thank you for your submission!',
  error: 'There was an error submitting your form. Please try again.'
},
error: {
  recaptcha: 'There was an error with the reCAPTCHA. Please try again.',
  field_validation: 'There was an error with field validation. Please check the form and try again.',
  unknown: 'There was an unknown error submitting your form. Please try again.'
}
```



