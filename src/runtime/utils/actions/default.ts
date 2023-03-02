import { useFetch } from '#app'
import type { ModuleTypes } from '#imports'

export class DefaultFormActions implements ModuleTypes.FormActions {

  public form: ModuleTypes.FormMappedForActions
  
  constructor(form: ModuleTypes.FormMappedForActions) {
    this.form = form
  }

  public async submit(){    

    const { data, error } = await useFetch(this.form.action, {
      key: String(new Date().getTime()),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
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

  public create() {
    return false
  }
  public update() {
    return false
  }
  public delete() {
    return false
  }
  public read() {
    return false
  }
}
