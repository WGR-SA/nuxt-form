import { FormDataHandler, FormValidator, FormMessageStore, DefaultFormSubmitter } from '#imports'

export interface FormModuleOptions {
  format_layers?: string[],
  // TODO: implement custom layers
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
  public state: FormBuilder.State = { status: 'idle' }
  public isShown: boolean = true

  public data: FormDataHandler
  public validator: FormValidator
  public messages: FormMessageStore 
  public submitter: any
  public moduleOptions: FormModuleOptions



  constructor(config: FormBuilder.Props, options: FormModuleOptions) {
    this.action = config.action ?? '#'
    this.data = new FormDataHandler()
    this.validator = new FormValidator()
    this.messages = new FormMessageStore(options.lang ?? 'en', {...options.messages, ...config.messages} ?? null)
    this.moduleOptions = options

    this.setSubmitter(config)
  }

  setSubmitter(config: FormBuilder.Props) {        
    if (config.submitter) {
      this.submitter = new config.submitter(this)
      return
    }
    this.submitter = new DefaultFormSubmitter(this)
  }

  async submit () {
    return await this.submitter.submit()
  }

  addField (config: FormInput.Container) {
    this.data.addField(config)
    this.data.setDefaultValue(config)
    this.validator.addRules({ name: config.name, rules: config.rules ?? [], messages: this.messages })
  }

  mutateState (status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string) {
    this.state.status = status
    if (errorType !== undefined) {
      this.state.errorType = errorType
    }
    this.isShown = !!['idle', 'ready', 'error'].find(s => s === this.state.status)
  }

  isReady () {
    return this.state.status === 'ready'
  }

  ready () {
    // DEPRECATED: Tmp alias for backwards compatibility
    return this.isReady()
  }
}
