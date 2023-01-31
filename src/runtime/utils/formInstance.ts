import { computed, ComputedRef } from 'vue'
import { FormDataHandler } from '#imports'

export class FormInstance {
  public fetchUrl: string
  public method: string
  public headers: { [key: string]: string }
  public stringify: boolean
  public state: FormBuilder.State = { status: 'idle' }
  public shown: ComputedRef<boolean> = computed(() => this.state.status === 'idle' || this.state.status === 'error')
  public response: FormBuilder.Response = null
  public data: FormDataHandler

  constructor (config: FormBuilder.Props) {
    this.method = config.method ?? 'POST'
    this.fetchUrl = config.fetchUrl
    this.headers = { ...config.headers }
    this.stringify = config.stringify ?? false
    this.data = new FormDataHandler(this.fetchUrl)
  }

  get fetchParams () {
    return {
      key: String(Date.now()),
      headers: this.headers,
      method: this.method,
      body: (this.stringify) ? this.data.getData() : JSON.stringify(this.data.getData())
    }
  }

  mutateState (status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string) {
    this.state = { status, errorType }
  }
}
