import BaseProfile from './BaseProfile'
import { Entity, getMetadataArgsStorage } from "typeorm"

export default class TypeORMProfile extends BaseProfile {
  public mapSchema(model: typeof Entity): FormInput.Container[] {
    
    const columns = getMetadataArgsStorage().filterColumns(model) 

    return Object.entries(columns).map(([key, column]) => {
      // Get nuxt form decorator data
      const formData = model.prototype.form[column.propertyName] ?? {} as FormInput.Container       
      return {
        key,
        name: formData.name ?? column.propertyName,
        label: formData.label ?? formData.name ?? column.propertyName,
        rules: [...(formData.rules ?? []), ...this.detectRules(column)],
        options: formData.options ?? this.getSelectOptions(column) ?? null,
        required: formData.required ?? false,
        checked: formData.checked ?? false,
        default: formData.default ?? this.getDefaultValue(column),
        type: formData.type ?? this.getTypeFromMetaData(column),
        placeholder: formData.placeholder ?? '',
      };
    });
  }

  public detectRules(column: any) {
    const rules: string[] = []
    if (column.options.isNullable === false) {
      rules.push('required')
    }
    return rules
  }

  public getTypeFromMetaData(column: any) {
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

  public getDefaultValue(column: any) {    
    if (column.options.default !== undefined) {
      return column.options.default
    }
    return ''
  }

  public getSelectOptions(column: any) {
    if (column.options.type === 'enum') {
      return column.options.enum.reduce((acc: any, curr: string) => (acc[curr] = curr, acc), {}); 
    }
    return {}
  }
}