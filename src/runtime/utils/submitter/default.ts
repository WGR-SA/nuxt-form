import { useFetch } from '#app'

export class DefaultFormSubmitter implements FormBuilder.FormSubmitter {

  public form: FormBuilder.FormForSubmitter
  
  constructor(form: FormBuilder.FormForSubmitter) {
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
      onResponse: ({ response }) => {
        if (response.ok) {
          this.form.mutateState('submitted')
        }
      }
    })

    return { data, error }
  }
}
