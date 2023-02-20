import { useFetch, UseFetchOptions } from '#app'
import { Form } from '#imports'

export class DefaultFormActions implements FormActions<unknown> {

  public form: Form
  public options: UseFetchOptions<unknown> = {
    key: String(new Date().getTime()),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  
  constructor(form: Form, options: UseFetchOptions<unknown>) {
    this.form = form
    this.options = {...this.options, ...options}
  }

  public async submit(){
    const { data, error } = await useFetch(this.form.action, {
      ...this.options,
      body: this.form.data.state,
      onRequest: () => {
        this.form.mutateState('submitting')
      },
      onResponseError: () => {
        this.form.mutateState('error', 'unknown')
      },
      onResponse: () => {
        this.form.mutateState('submitted')
      }
    })

    return { data, error }
  }

  public async save() {
    this.form.mutateState('submitted')
  }

  public async update() {
    this.form.mutateState('submitted')
  }

  public async delete() {
    this.form.mutateState('submitted')
  }

  public async index() {
  }

  public async get() {
  }
}
