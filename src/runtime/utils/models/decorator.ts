export default function NuxtFormField(options: FormInput.Container) {
  return function (target: FormInput.Container, propertyName: string) {
    if (!target.form) {
      target.form = [];
    }
    target.form.push({
      slug: propertyName,
      ...options,
    })
  };
} 