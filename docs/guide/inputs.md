# Inputs

## `FormInput`

### Props 
- `name` Extends HTML name input attribute.
- `label` Input label. Defaults use the name prop if empty.
- `type` Extends HTML type input attribute.
- `value` Initial value.
- `rules` List of rules for validation. See [Validation](/guide/validation.html)
- `mask` Mask pattern. See [Mask](#mask)
- `suggestions` Suggestion object. See [Suggestions](#suggestions)
- `required` Boolean to set the input as required.
- `disabled` Boolean to disable the input.
- `readonly` Boolean to set the input as read-only.
- `placeholder` Placeholder text.

### Exemple
```VUE
<FormInput 
  name="fieldname"
  label="Name"
  :rules="['isNotEmpty']" 
  :suggestions="{ values: suggestions }"
/>
```

## `FormSelect`

### Props
`FormSelect` extends `FormInput` props and adds the following options:
- `options` Key-value object for select options.
- `multiple` Boolean for multiple select.

### Example
```VUE
<FormSelect
  name="fieldname"
  label="Name"
  :options="{ 1: 'Foo', 2: 'Bar' }"
/>
```

## `FormTextarea`

### Props
`FormTextarea` extends `FormInput` props and adds the following options:
- `rows` Extends the rows attribute from HTML textarea.  

### Example
```VUE
<FormTextarea
  name="fieldname"
  label="Name"
  rows="4"
/>
```

## `FormRadio`

### Props
`FormRadio` extends `FormInput` props and adds the following options:
- `options` Key-value object for select options.
- `default` Default value.

### Example
```VUE
<FormRadio
  name="fieldname"
  label="Name"
  :options="{ 1: 'Foo', 2: 'Bar' }"
/>
```

## `FormFile`

### Props
`FormFile` extends `FormInput` props and adds the following options:
- `accept` Accepts file types.

### Exemple
```VUE
<FormFile
  name="fieldname"
  label="File"
  accept=".jpg"
/>
```

## `FormSubmit`

### Props
- `validate-only` Optional. Only trigger validation.

### Exemple
```VUE
<FormSubmit>
  Submit
</FormSubmit>
```


## Suggestions

Suggestions can be applied to `FormInput`. The suggestion object follows this structure:

```TS
suggestions: {
  type: 'list' | 'api' ,
  fetchUrl?: string,
  responsePath?: string,
  responseKey?: string,
  values?: string[] | { [key: string]: string } | string
},
```

Suggestions have two possible types:
- `list` Will search in values when the user types in the field and show suggestions.
  - `responseKey` is used for keying data if needed.
- `api`  Will make an API call to `fetchUrl`  when the input value length is greater than 3 and display results.
  - `responsePath` is an option for routing data in response.

### Example

```VUE
<FormInput 
  name="fieldname"
  label="Name"
  :suggestions="{ type: 'api', fetchUrl: 'https://apiurl.test' }"
/>
```

## Masks

Nuxt-form uses [Maska](https://beholdr.github.io/maska) or masking input values. To use it, add a Maska pattern in the `FormInput` mask prop. mask prop. See all mask options in [Maska documentation](https://beholdr.github.io/maska/#/?id=usage)

### Example 

```VUE
<FormInput 
  name="fieldname"
  label="Name"
  mask="###.####.####.##"
/>
```
 
## Custom Input

You can use `FormInputContainer` component for creating any custom input. It will initiate field data and add a validation system. Access and change data with `form.data.state['fieldname']`. You can add the `FormSuggest` and any other component inside.

### Example

```VUE
<script lang="ts" setup>
  const form = inject('form')
</script>
<template>
  <FormInputContainer name="fieldname" label="Name" :rules="['isNotEmpty']">
    <input v-model="form.data.state['fieldname']" >    
  </FormInputContainer>
</template>
```

