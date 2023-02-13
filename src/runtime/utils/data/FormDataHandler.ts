export class FormDataHandler {
  public state: { [key: string]: any } = {}

  addField( name: string ) {
    if (name in this.state) {
      return
    }    
    
    this.state[name] = ''
    this.setDefaultValue(name)
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
