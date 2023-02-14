import { ProfileFactory } from './profiles'

export class FormModelFormatter {
  private model: FormModel.EntityModel

  constructor(model: FormModel.EntityModel) {
    this.model = model
  }

  getProfile(profile: string) {
    return new ProfileFactory[profile]
  }

  getFields(profile: string): FormInput.Container[] {    
    return this.getProfile(profile).mapSchema(this.model)
  }

  getInputComponent(type: string): string {
    switch (type) {
      case 'select':
        return 'FormSelect'
      case 'radio':
        return 'FormRadio'
      case 'textarea':
        return 'FormTextarea'
      default:
        return 'FormInput'
    }
  }
}