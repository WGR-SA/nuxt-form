declare global {
  interface Window {
    grecaptcha: any;
  }
}

export * from './module'
export * from './builder'
export * from './data'
