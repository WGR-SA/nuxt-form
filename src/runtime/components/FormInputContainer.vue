<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { useFormData } from '../composables/data'
import * as validators from '@vuelidate/validators'

console.log(validators);


const { v$, addField } = useFormData()
const instance = getCurrentInstance();
const parentProps = instance?.parent?.props;
const name = parentProps?.name as string;
const rulesList = parentProps?.rules as string[];
const rules = rulesList //.map(r => validators[r]);

//addField(({ name: name, rules: rules }))
</script>

<template>
  <div v-if="parentProps" class="form__input">
    <label :for="name">{{ parentProps.label }}</label>
    <slot />
    <p class="form__error" v-for="error of v$[name].$errors" :key="error.$uid">
      {{ error.$message }}
    </p>
  </div>
</template>