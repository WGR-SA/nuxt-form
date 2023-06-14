# Model

The `FormGenerator` component within the Nuxt-Form module leverages models to generate form inputs. You can supply the model to the `FormGenerator` via the model props.

## Model

By default, the model follows the structure specified by the `FormInput.Container` inteface structure. interface. You can create a model by forming an array of  `FormInput.Container` items. The `FormGenerator` will then use this to generate your form.

```TS
interface Container {
  name: string,
  label?: string,
  rules?: Array<string | { [key: string]: string[] }>,
  options?: { [key: string | number]: string },
  required?: boolean,
  checked?: boolean,
  value?: string,
  accept?: string,
  mask?: string,
  multiple?: boolean,
  default?: string,
  type?: string,
  placeholder?: string,
  [key: string]: any
}
```

## `ModelFormatter`
There might be situations where you already have a model that does not fit the format required by the `FormGenerator`. For example, if you have a TypeORM Entity and you wish to utilize it. In these cases, the `FormGenerator? provides a model formatter. By adding formatting layers to the layers props, the formatter can transform your model to the format that the FormGenerator requires. Currently available layers are:

- **`typeorm`** for formatting TypeORM entities.
- **`class-validator`** for interpreting class-validator decorators.
- **`form`** for interpreting [`NuxtFormField`](/guide/model.html#nuxtformfield) decorator.

**A significant forthcoming feature will allow adding custom layers to this list.**

### Example

Consider a TypeORM model:

```TS
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @NuxtFormField({ label: 'Firstname' })
  firstname: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @NuxtFormField({ label: 'Lastname' })
  lastname: string;
}
```
You can pass this model directly to the FormGenerator in a Vue file:
```VUE
<script lang="ts" setup>
import User from 'user.model'
</script>
<template>
  <FormGenerator :model="User" :layers="['typeorm', 'class-validator', 'form']" />
</template>
```


## `NuxtFormField`
The `NuxtFormField` decorator can be used in any class. Coupled with its formatter, it fills in any missing parameters needed for form generation, such as labels.

Example
```TS
class Foo {
  @NuxtFormField({ label: 'Lastname' })
  lastname: string
}
```
