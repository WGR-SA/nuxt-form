import BaseProfile from './BaseProfile'
import { Entity } from "typeorm"

export default class TypeORMProfile extends BaseProfile {
  public mapSchema(model: typeof Entity): FormInput.Container[] {
    return Object.entries(model).map(([key, column]) => {
      console.log(column);
      return {
        key,
        name: column.name,
        label: column.form.label ?? column.form.name,
        rules: column.form.rules ?? [],
        options: column.form.rules ?? {},
        required: column.form.required ?? false,
        checked: column.form.checked ?? false,
        value: column.form.value ?? '',
        default: column.form.default ?? '',
        type: column.form.type ?? 'text',
        placeholder: column.form.placeholder ?? '',
      };
    });
  }
}