# Submit

The `FormBuilder` and `FormGenerator` components create a new instance of the `Form` class that contains a state. This state informs the form of its current status, for example, to display an alert message or hide fields when sending the form. To manage this - due to Vue.js restrictions - you need to create a `FormSubmitter` class. This class handles various sending methods and alters the form status when necessary. A default `FormSubmitter` class is provided when generating a form. Custom submitter classes can be created based on the `FormSubmitter` interface.



## Default

The default `FormSubmitter` provides a submit method that handles multiple statuses:

```TS
export class DefaultFormSubmitter implements FormSubmitter {

  public form: FormForSubmitter
  
  constructor(form: FormForSubmitter) {
    this.form = form    
  }

  public async submit(){    
    const { data, error } = await useFetch(this.form.action, {
      key: String(new Date().getTime()),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      watch: false,
      body: this.form.data.state,
      onRequest: () => {
        this.form.mutateState('submitting')
      },
      onResponseError: () => {
        this.form.mutateState('error', 'unknown')
      },
      onResponse: () => {
        this.form.mutateState('submitted')
      }
    })

    return { data, error }
  }
}
```

## Custom

You can create a custom `FormSubmitter` and pass it to the `submitter` props of `FormBuilder` and `FormGenerator`. 

```TS
export class CustomFormSubmitter implements FormSubmiter  {

  public form: Form
  
  constructor(form: Form) {
    this.form = form
  }

  public async submit(){    
    // Submit method
  }
}
```

With this, you can now access all the functionalities of the `Form` class, like `mutateState(status, errorType)` See [Builder](/guide/build.html) for details. 

Then add it to your `FromBuilder`
```VUE
<script lang="ts" setup>
import CustomFormSubmitter from ...
</script>
<template>
  <FormBuilder action="..." :submitter="CustomFormSubmitter">
    ...
    <FormSubmit>
      Submit
    </FormSubmit>
  </FormBuilder>
</template>

```
