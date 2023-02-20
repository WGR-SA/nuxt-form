import BaseModelLayer from './base'

export default class FormLayer extends BaseModelLayer {

  columns: FormModel.Column[] = []

  public getColumns = (model: { [key: string]: any }) => {
    console.log(Object.values(model.prototype.form));
       
    this.columns = Object.values(model.prototype.form) ?? [] as FormInput.Container[]    
    return this.mapLayer()
  }

  public mapLayer = (): FormInput.Container[] => {
    return this.columns.map((column) => {      
      return {
        name: column.slug,
        label: column.label ?? null,
        // rules: this.detectRules(column),
        // options: this.getOptions(column),
        // required: column.required ?? false,
        // checked: column.checked ?? false,
        // value: column.value ?? this.getDefaultValue(column),
        // default: column.default ?? this.getDefaultValue(column),
        // type: this.getType(column),
        // placeholder: column.placeholder ?? '',
        // component: this.getComponent(column),
      }
    })
  }

  public detectRules = (column: FormModel.Column) => {
    const rules: string[] = column.rules ?? []
    if (column.required) {
      rules.push('required')
    }
    return rules
  }

  public getType = (column: FormModel.Column) => {
    if (!column.type) {
      return null
    }
    return column.type ?? 'text'
  }

  public getDefaultValue = (column: FormModel.Column) => {
    if (!column.default) {
      return null
    }
    return column.default ?? ''
  }

  public getOptions = (column: FormModel.Column) => {
    if (!column.options) {
      return null
    }
    return column.options ?? {}
  }

  public getComponent = (column: FormModel.Column) => {
    switch (this.getType(column)) {
      case 'select':
        return 'FormSelect'
      case 'textarea':
        return 'FormTextarea'
      case 'radio':
        return 'FormRadio'
      default:
        return 'FormInput'
    }
  }
}