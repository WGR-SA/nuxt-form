import * as validators from '@vuelidate/validators'

export class FormDataHandler {
  public rules: { [key: string]: any } = {}
  public state: { [key: string]: any } = {}

  addField(options: { name: string, rules: Array<string | { [key: string]: string[] }> }) {
    if (options.name in this.state) {
      return
    }    
    
    this.state[options.name] = ''
    this.rules[options.name] = options.rules.map((r: string | { [key: string]: string[] }) => {
      if (typeof r === 'string') {
        return validators[r as keyof typeof validators]
      } else {
        const vkey = Object.keys(r)[0]
        return validators[vkey as keyof typeof validators](...r[vkey])
      }
    })   
  }

  addCustomData (name: string, value: string) {
    this.state[name] = value
  }

  setDefaultValue (field: any) {
    if (field.type === 'checkbox') {
      this.state[field.name] = 'false'
    }
    if (field.options) {
      this.state[field.name] = field.default ?? Object.keys(field.options)[0]
    }
    if (field.checked) {
      this.state[field.name] = field.value ?? String(field.checked)
    }
  }
}
