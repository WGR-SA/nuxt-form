export function NuxtFormField(options: FormInput.Container) {
  return function (target: FormInput.Container, propertyName: string) {
    if (!target.form) {
      target.form = {};
    }
    target.form[propertyName] = options;
  };
} 