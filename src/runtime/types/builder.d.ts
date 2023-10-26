declare namespace FormBuilder {
  interface Messages {
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
    submitter?: any,
    messages?: Partial<FormBuilder.Messages>,
    lang?: string
  }

  type Status = 'idle' | 'ready' | 'validate' | 'submitting' | 'submitted' | 'error'
  type ErrorType = 'field_validation' | 'recaptcha' | 'unknown' | false | undefined | string
  type State = { status: Status, errorType?: ErrorType }
}
