import { FormMessages, ValidatorMessages } from '#imports'

export class FormMessageStore {
  public form: { [lang: string]: FormBuilder.Messages } = FormMessages
  public validators: { [lang: string]: { [key: string]: string } } = ValidatorMessages
  public lang: string = 'en'

  updateFormMessages (lang: string, messages: FormBuilder.Messages) {
    this.form[lang] = Object.assign(this.form[lang], messages)
  }

  updateValidatorMessages (lang: string, messages: { [key: string]: string }) {
    this.validators[lang] = Object.assign(this.validators[lang], messages)
  }

  setLang (lang: string) {
    this.lang = lang
  }

  get (path: string, type: 'form' | 'validators' = 'form', lang: string = this.lang,) {
    return this.resolvePath(path, this[type][lang]) ?? this.resolvePath(path, this[type]['en'])
  }   

  resolvePath (path: string | string[], obj: any, separator = '.') {
    const properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }
}