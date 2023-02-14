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
        options: formData.options ?? this.getSelectOptions(column),
        required: formData.required ?? false,
        checked: formData.checked ?? false,
        value: formData.value ?? '',
        default: formData.default ?? this.getDefaultValue(column),
        type: formData.type ?? this.getTypeFromMetaData(column),
        placeholder: formData.placeholder ?? '',
      };
    });
  }

  public detectRules(column: any) {
    const rules: string[] = []
    if (column.isNullable === false) {
      rules.push('required')
    }
    return rules
  }

  public getTypeFromMetaData(column: any) {
    switch (column.type) {
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
    if (column.default !== undefined) {
      return column.default
    }
    return ''
  }

  public getSelectOptions(column: any) {
    if (column.type === 'enum') {
      return column.enum.map((option: any) => {
        return {
          value: option,
          label: option,
        }
      })
    }
    return [] 
  }
}