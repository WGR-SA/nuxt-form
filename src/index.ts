export { default } from './module'
export { NuxtFormField, BasicFormActions } from '#imports'

declare global {
  interface Window {
    grecaptcha: any;
  }
}
