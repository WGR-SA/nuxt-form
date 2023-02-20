
import { Entity, getMetadataArgsStorage } from "typeorm"
import BaseModelLayer from './base'

export default class TypeORMLayer extends BaseModelLayer {

  columns: FormModel.Column[] = []

  public getColumns = (model: {[key: string]: any}) => {
    this.columns = getMetadataArgsStorage().filterColumns(model as typeof Entity)
    return this.mapLayer()
  }
    
  public mapLayer = (): FormInput.Container[] => {
    return this.columns.map((column) => {
      return {
        name: column.propertyName,
        label: column.propertyName,
        rules: this.detectRules(column),
        options: this.getOptions(column),
        default: this.getDefaultValue(column),
        type: this.getType(column),
      };
    });
  }

  public detectRules = (column: FormModel.Column) => {
    const rules: string[] = []
    if (column.options.isNullable === false) {
      rules.push('required')
    }
    return rules
  }

  public getType = (column: FormModel.Column) => {
    if (column.options.primary) {
      return 'hidden'
    }
    switch (column.options.type) {
      case 'int':
        return 'number'
      case 'varchar':
        return 'text'
      case 'text':
        return 'textarea'
      case 'boolean':
        return 'checkbox'
      case 'date':
        return 'date'
      case 'datetime':
        return 'datetime'
      case 'enum':
        return 'select'
      default:
        return 'text'
    }
  }

  public getDefaultValue = (column: FormModel.Column) => {    
    if (column.options.default !== undefined) {
      return column.options.default
    }
    return ''
  }

  public getOptions = (column: FormModel.Column) => {
    if (column.options.type === 'enum') {
      return column.options.enum.reduce((acc: { [key: string | number]: string }, curr: string) => (acc[curr] = curr, acc), {}); 
    }
    return {}
  }
}