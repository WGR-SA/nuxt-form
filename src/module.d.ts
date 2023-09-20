export interface FormForSubmitter {
  action: string
  data: {
    state: { [key: string]: string }
  }
  mutateState: (status: string, errorType?: string) => void
  [key: string]: any
} 

export interface FormActions {

  form: FormForSubmitter

  submit()
}

export interface FormModuleOptions {
  format_layers ?: string[],
  actions ?: FormActions,
  recaptcha ?: boolean,
  hide_recaptcha ?: boolean,
  mask?: boolean,
  default_styles ?: boolean,  
  messages ?: object,
  lang ?: string,
}