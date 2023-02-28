import { FormDataHandler, FormValidator, FormMessageStore, DefaultFormActions } from '#imports'
import type { ModuleTypes } from '#imports'

export interface FormModuleOptions {
  format_layers?: string[],
  // custom_layers?: {
  //   [key: string]: FormModel.FormatLayer
  // },
  actions?: any,
  recaptcha?: boolean,
  hide_recaptcha?: boolean,
  default_styles?: boolean,
  messages?: object,
  lang?: string,
}

export class Form {
  public action: string
  public process: string
  public state: FormBuilder.State = { status: 'idle' }
  public shown: boolean = true

  public data: FormDataHandler
  public validator: FormValidator
  public messages: FormMessageStore 
  public actions: ModuleTypes.FormActions
  public moduleOptions: FormModuleOptions

  constructor(config: FormBuilder.Props, options: FormModuleOptions) {
    this.action = config.action ?? '.'
    this.process = config.process ?? 'submit'
    this.data = new FormDataHandler()
    this.validator = new FormValidator()
    this.messages = new FormMessageStore(options.lang ?? 'en', options.messages ?? {})
    this.moduleOptions = options

    this.setActions(config)
  }

  setActions(config: FormBuilder.Props) {        
    if (config.actions) {
      this.actions = new config.actions(this)
      return
    }
    this.actions = new DefaultFormActions(this)
  }

  addField (config: FormInput.Container) {
    this.data.addField(config)
    this.data.setDefaultValue(config)
    this.validator.addRules({ name: config.name, rules: config.rules ?? [], messages: this.messages })
  }

  mutateState (status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string) {
    this.state = { status, errorType }
    this.shown = !!['idle', 'ready', 'error'].find(s => s === this.state.status)
  }

  ready () {
    return this.state.status === 'ready'
  }
}
