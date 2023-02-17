import { FormDataHandler, FormValidator, FormMessageStore, BasicFormActions } from '#imports'

export class FormInstance {
  public action: string
  public process: string
  public state: FormBuilder.State = { status: 'idle' }
  public shown: boolean = true
  public data: FormDataHandler
  public validator: FormValidator
  public messages: FormMessageStore 
  public actions: FormActions.Actions<unknown>

  constructor(config: FormBuilder.Props) {
    this.action = config.action
    this.process = config.process ?? 'submit'
    this.data = new FormDataHandler()
    this.validator = new FormValidator()
    this.messages = new FormMessageStore()
    this.actions = config.actions ?? new BasicFormActions(this, config.fetchOptions)
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
