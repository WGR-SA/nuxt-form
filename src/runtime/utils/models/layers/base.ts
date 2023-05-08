export default class BaseModelLayer implements FormModel.FormatLayer  {

  columns: FormModel.Column[] = []

  public getColumns = (model: any[]) => {
    this.columns = model    
    return this.mapLayer()
  }

  public mapLayer = (): FormInput.Container[] => {
    return this.columns.map((column) => {      
      return {
        name: column.name,
        label: column.label ?? column.name,
        rules: [...this.detectRules(column), ...column.rules ?? []],
        options: this.getOptions(column),
        required: column.required ?? false,
        mask: column.mask ?? null,
        accept: column.accept ?? null,
        multiple: column.multiple ?? null,
        checked: column.checked ?? false,
        value: column.value ?? this.getDefaultValue(column),
        default: this.getDefaultValue(column),
        type: this.getType(column),
        placeholder: column.placeholder ?? '',
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
    return column.type ?? 'text'
  }

  public getDefaultValue = (column: FormModel.Column) => {
    return column.default ?? ''
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