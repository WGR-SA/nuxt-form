export interface FormMappedForActions {
  action: string
  data: {
    state: { [key: string]: string }
  }
  mutateState: (status: string, errorType?: string) => void
  [key: string]: any
} 

export interface FormActions {

  form: FormMappedForActions

  submit()
  create()
  update(id: string | null)
  delete(id: string | null)
  read(id: string | null)
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