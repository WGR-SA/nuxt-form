<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { User } from './entities/User'

const suggestions = [
  "AMB",
  "Agrisano",
  "Aquilana",
  "Arcosana",
  "Assura",
  "Atupri",
  "Avenir",
  "Birchmeier",
  "CSS",
  "Compact",
  "Concordia",
  "EGK",
  "Easy Sana",
  "Einsiedeln",
  "Galenos",
  "Glarner",
  "Groupe Mutuel",
  "Helsana",
  "Innova",
  "Intras",
  "KPT / CPT",
  "Klug",
  "Kolping",
  "Luzerner Hinterland",
  "Philos",
  "Provita",
  "Rhenusana",
  "SLKK",
  "Sana24",
  "Sanagate",
  "Sanitas",
  "Sodalis",
  "Steffisburg",
  "Sumiswalder",
  "Supra",
  "Swica",
  "Sympany",
  "Visana",
  "Visperterminen",
  "Vita Surselva",
  "Vivacare",
  "Wädenswil",
  "ÖKK"
] 

const loginForm = ref()
const userForm = ref()

watchEffect(async () => {
  if (loginForm.value?.ready()) {
    console.log('ready');
    const {data, error} = await loginForm.value.actions.submit()
    console.log(data, error);
  }

  if(userForm.value?.ready()){
    console.log('ready');
    const {data, error} = await userForm.value.actions.submit()
    console.log(data, error);
  }
})

const newEntity = new User()
//newEntity.email = 'test@test.ch'
//newEntity.firstName = 'John'
newEntity.lastName = 'Doe'

const model = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    rules: ['isEmail']
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    mask: 'A',
    rules: [{minLength: [3]}]
  }
]
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <FormGenerator 
      ref="userForm"
      action="https://httpbin.org/post?v=1"
      :model="User"
      :values="newEntity"
      :layers="['typeorm', 'class-validator', 'form']"
    >
      <FormSubmit>
        olo
      </FormSubmit>
    </FormGenerator>

    <FormGenerator
      ref="userForm"
      action="https://httpbin.org/post?v=2"
      :model="model"
      :layers="[ 'base']"
      :messages="{ alert: { submitted: 'Vous vous êtes bien connecté' } }"
    >
      <FormSubmit>
        Login
      </FormSubmit>
    </FormGenerator>

    <FormBuilder 
      ref="loginForm" 
      action="https://httpbin.org/post?v=3" 
    >
      <FormInput 
        name="assurance2"
        label="Assurance2"
        :rules="['isNotEmpty']"
      />
      <FormInput 
        name="assurance"
        label="Assurance"
        value="yolo"
        :readonly="true"
        :rules="['isNotEmpty']" 
        :suggestions="{
          values: suggestions,
        }"
      />



      <!--

      <FormFile
        name="file" 
        type="file" 
        label="file"
      />
      <FormInput 
        mask="A"
        name="name"
        label="Nom"
        :rules="['isNotEmpty']" 
        placeholder="Nom"
      /> -->
      <FormInput 
        name="username" 
        label="Email"
        :required="true"
        :rules="['isEmail', 'isNotEmpty']" 
        placeholder="email" 
      />
      <!--
      <FormInput 
        name="password" 
        type="password" 
        label="Password" 
        placeholder="password" 
      />  -->
      <FormSubmit>
        Login
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
