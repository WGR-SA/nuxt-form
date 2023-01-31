export { default } from './module'

declare global {
  interface Window {
    grecaptcha: any;
  }
}
