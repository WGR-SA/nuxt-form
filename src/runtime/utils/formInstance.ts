import { UseFetchOptions } from '#app'
import { FormDataHandler, FormValidator, FormMessageStore } from '#imports'

export class FormInstance {
  public action: string
  public method: string
  public headers: { [key: string]: string }
  public stringify: boolean
  public response: FormBuilder.Response = null
  public state: FormBuilder.State = { status: 'idle' }
  public shown: boolean = this.state.status === 'idle' || this.state.status === 'error'
  public data: FormDataHandler
  public validator: FormValidator
  public messages: FormMessageStore 

  constructor(config: FormBuilder.Props) {
    this.method = config.method ?? 'POST'
    this.action = config.action
    this.headers = { ...config.headers }
    this.stringify = config.stringify ?? false
    this.data = new FormDataHandler()
    this.validator = new FormValidator()
    this.messages = new FormMessageStore()
  }

  get fetchParams () {
    return {
      key: String(Date.now()),
      headers: this.headers,
      method: this.method,
      body: (this.stringify) ? this.data.state : JSON.stringify(this.data.state)
    } as UseFetchOptions<unknown>
  }

  addField (config: FormInput.Container) { 
    this.data.addField(config.name)
    this.validator.addRules({ name: config.name, rules: config.rules ?? [], messages: this.messages })
  }

  mutateState (status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string) {    
    this.state = { status, errorType }
  }
}
