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
    method?: 'POST' | 'GET',
    headers?: { [key: string]: string },
    stringify?: boolean,
    messages?: Partial<Messages>,
    lang?: string,
  }

  type Status = 'idle' | 'submitting' | 'submitted' | 'error'
  type ErrorType = 'field_validation' | 'recaptcha' | 'unknown' | false
  type State = { status: Status, errorType?: ErrorType | string }
  type Response = { [key: string]: any } | null
}
