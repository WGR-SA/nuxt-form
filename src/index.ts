export { default } from './module'
export { NuxtFormField } from '#imports'

declare global {
  interface Window {
    grecaptcha: any;
  }
}
