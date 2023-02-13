export default class BaseProfile {
  public mapSchema(model: FormModel.EntityModel): FormInput.Container[] {
    return Object.entries(model).map(([key, column]) => {
      return {
        key,
        name: column.name,
        label: column.label ?? column.name,
        rules: column.rules ?? [],
        options: column.rules ?? {},
        required: column.required ?? false,
        checked: column.form.checked ?? false,
        value: column.form.value ?? '',
        default: column.form.default ?? '',
        type: column.form.type ?? 'text',
        placeholder: column.form.placeholder ?? '',
      };
    });
  }
}