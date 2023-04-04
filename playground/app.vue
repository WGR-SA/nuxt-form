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
</script>

<template>
  <div style="max-width: 1200px;padding: 40px;margin: 0 auto;">
    <!-- <FormGenerator 
      ref="userForm"
      action="https://httpbin.org/post"
      :model="User"
      :values="newEntity"
      :layers="['typeorm', 'class-validator',  'form']"
      :messages="{ submit: 'Register' }"
    /> -->

    <FormBuilder 
      ref="loginForm" 
      action="https://httpbin.org/post" 
      :messages="{ alert: { submitted: 'Vous vous êtes bien connecté' } }"
    >
      <!-- <FormInput 
        name="assurance"
        label="Assurance"
        :rules="['isNotEmpty']" 
        :suggestions="{
          values: suggestions,
        }"
      /> -->

      <FormSelectMultiple
        name="multiple"
        label="Assurance"
        :multiple="true"
        :rules="['isNotEmpty']" 
        :options="['yolo', 'yolo2', 'yolo3']"
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
      <!-- <FormInput 
        name="username" 
        label="Email"
        :required="true"
        :rules="['isEmail', 'isNotEmpty']" 
        placeholder="email" 
      />
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
