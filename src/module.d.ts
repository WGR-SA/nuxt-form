export { FormActions } from './runtime/types/actions'

export interface FormModuleOptions {
  format_layers ?: string[],
    custom_layers ?: {
      [key: string]: FormModel.FormatLayer
    },
    recaptcha ?: boolean,
    hide_recaptcha ?: boolean,
    default_styles ?: boolean,
    messages ?: object,
    lang ?: string,
}