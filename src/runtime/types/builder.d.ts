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
    submitter?: FormSubmitter,
    messages?: Partial<Messages>,
    lang?: string
  }

  interface FormForSubmitter {
    action: string
    data: {
      state: { [key: string]: string }
    }
    mutateState: (status: string, errorType?: string) => void
    [key: string]: any
  } 

  export interface FormSubmitter {
    form: FormForSubmitter
    submit(): Promise<any>
  }

  type Status = 'idle' | 'ready' | 'validate' | 'submitting' | 'submitted' | 'error'
  type ErrorType = 'field_validation' | 'recaptcha' | 'unknown' | false | undefined | string
  type State = { status: Status, errorType?: ErrorType }
}
