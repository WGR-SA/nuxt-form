import { useFetch } from '#app'
import type { ModuleTypes } from '#imports'

export class DefaultFormSubmitter implements ModuleTypes.FormSubmitter {

  public form: ModuleTypes.FormForSubmitter
  
  constructor(form: ModuleTypes.FormForSubmitter) {
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
      watch: false,
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
}
