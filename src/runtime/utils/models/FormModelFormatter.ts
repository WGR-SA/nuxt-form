import { ProfileFactory } from './profiles'

export class FormModelFormatter {
  private model: FormModel.EntityModel
  public profile: string

  constructor(model: FormModel.EntityModel, profile: string) {
    this.model = model
    this.profile = profile
  }

  getProfile(profile: string) {
    return new ProfileFactory[profile]
  }

  getFields(): FormInput.Container[] {    
    return this.getProfile(this.profile).mapSchema(this.model)
  }

  getInputComponent(type: string | undefined): string {
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