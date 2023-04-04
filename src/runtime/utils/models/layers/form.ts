import BaseModelLayer from './base'

export default class FormLayer extends BaseModelLayer {

  columns: FormModel.Column[] = []

  public getColumns = (model: { [key: string]: any }) => {
    this.columns = model.prototype.form ?? [] 
    
    return this.mapLayer()
  }

  public mapLayer = (): FormInput.Container[] => {
    return this.columns.map((column) => {      
      return {
        name: column.slug,
        label: column.label ?? null,
        rules: this.detectRules(column),
        options: this.getOptions(column),
        mask: column.mask ?? null,
        required: column.required ?? null,
        accept: column.accept ?? null,
        multiple: column.multiple ?? null,
        checked: column.checked ?? null,
        value: column.value ?? this.getDefaultValue(column),
        default: column.default ?? this.getDefaultValue(column),
        type: this.getType(column),
        placeholder: column.placeholder ?? null,
        component: this.getComponent(column),
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
    return column.type ?? null
  }

  public getDefaultValue = (column: FormModel.Column) => {
    return column.default ?? null
  }

  public getOptions = (column: FormModel.Column) => {
    return column.options ?? null
  }

  public getComponent = (column: FormModel.Column) => {
    switch (this.getType(column)) {
      case 'select':
        return 'FormSelect'
      case 'textarea':
        return 'FormTextarea'
      case 'radio':
        return 'FormRadio'
      case 'file':
        return 'FormFile'
      default:
        return 'FormInput'
    }
  }
}