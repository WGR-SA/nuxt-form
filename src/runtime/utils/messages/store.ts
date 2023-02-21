import { FormMessages, ValidatorMessages } from '#imports'

export class FormMessageStore {
  public form: { [lang: string]: FormBuilder.Messages } = FormMessages
  public validators: { [lang: string]: { [key: string]: string } } = ValidatorMessages
  public lang: string = 'en'

  constructor (lang: string, messages: Partial<FormBuilder.Messages> | null = null) {
    this.setLang(lang)
    if (messages) {
      this.updateFormMessages(lang, messages)
    }
  }

  updateFormMessages (lang: string, messages: Partial<FormBuilder.Messages>) {        
    this.form[lang].submit = messages.submit ?? this.form[lang].submit
    if (messages.error) this.form[lang].error = { ...this.form[lang].error, ...messages.error }
    if (messages.alert) this.form[lang].alert = { ...this.form[lang].alert, ...messages.alert }    
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