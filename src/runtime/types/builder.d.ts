declare namespace FormBuilder {
  interface Messages {
    submit: string,
    alert: {
      idle: string,
      submitting: string,
      submitted: string,
      error: string
    },
    error: {
      recaptcha: string,
      field_validation: string,
      unknown: string
    }
    [key: string]: any
  }

  interface Props {
    action: string,
    process?: FormActions.methods,
    actions?: FormActions.Actions<unknown>,
    fetchOptions?: UseFetchOptions<unknown>,
    messages?: Partial<FormBuilder.Messages>,
    lang?: string
  }

  type Status = 'idle' | 'ready' | 'validate' | 'submitting' | 'submitted' | 'error'
  type ErrorType = 'field_validation' | 'recaptcha' | 'unknown' | false | undefined | string
  type State = { status: Status, errorType?: ErrorType | string }
}
