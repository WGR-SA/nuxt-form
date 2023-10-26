import { useFetch } from '#app'
import type { FormSubmitter, FormForSubmitter } from '../../../module.d'

export class DefaultFormSubmitter implements FormSubmitter {

  public form: FormForSubmitter
  
  constructor(form: FormForSubmitter) {
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
