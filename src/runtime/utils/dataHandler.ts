import { Ref } from 'vue'
import * as validators from '@vuelidate/validators'

export class FormDataHandler {
  private rules

  public state
  public v$

  constructor(rules: Ref<{ [key: string]: any }>, state: Ref<{ [key: string]: string }>, v$: Ref) {    
    this.state = rules
    this.rules = state
    this.v$ = v$
  }

  async fieldValidation () {
    return await this.v$.value.$validate()
  } 

  flushData () {
    this.state.value = {}
    this.rules.value = {}
  }

  addField (options: { name: string, rules: string[] }) {
    if (options.name in this.state.value) {
      return
    }
    
    this.state.value[options.name] = ''
    this.rules.value[options.name] = options.rules.map((r: string) => validators[r as keyof typeof validators])    
    // TO DO: add lng supporst for error messages & custom messages
  }

  addCustomData (name: string, value: string) {
    this.state.value[name] = value
  }

  setDefaultValue (field: any) {
    if (field.type === 'checkbox') {
      this.state.value[field.name] = 'false'
    }
    if (field.options) {
      this.state.value[field.name] = field.default ?? Object.keys(field.options)[0]
    }
    if (field.checked) {
      this.state.value[field.name] = field.value ?? String(field.checked)
    }
  }
}
