import { computed, ComputedRef, Ref } from 'vue'
import { UseFetchOptions } from '#app'
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

  constructor(config: FormBuilder.Props, rules: Ref<{ [key: string]: any }>, state: Ref<{ [key: string]: string }>, v$: Ref) {
    this.method = config.method ?? 'POST'
    this.fetchUrl = config.fetchUrl
    this.headers = { ...config.headers }
    this.stringify = config.stringify ?? false
    this.data = new FormDataHandler(rules, state, v$)
  }

  get fetchParams () {
    return {
      key: String(Date.now()),
      headers: this.headers,
      method: this.method,
      body: (this.stringify) ? this.data.state : JSON.stringify(this.data.state)
    } as UseFetchOptions<unknown>
  }

  mutateState (status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string) {
    this.state = { status, errorType }
  }
}
