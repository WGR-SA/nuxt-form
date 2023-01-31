import { computed, ComputedRef } from 'vue'
import { useState, useRuntimeConfig } from '#app'
import { FormDataHandler } from '../classes/data'
import * as defaultFormMessages from '../messages/form'

const moduleConfig = useRuntimeConfig().public.form
const defaultMessages: FormBuilder.Messages = defaultFormMessages[moduleConfig.lang as keyof typeof defaultFormMessages] ?? defaultFormMessages.en

export class FormInstance {
  fetchUrl: string
  method?: string
  messages?: FormBuilder.Messages
  headers?: { [key: string]: string }
  stringify?: boolean

  public data: { [key: string]: string }
  public rules: { [key: string]: unknown }
  public state: FormBuilder.State
  public shown: ComputedRef<boolean>
  public response: FormBuilder.Response
  public dataHandler: FormDataHandler

  constructor (options: FormInstance) {
    this.method = options.method ?? 'POST'
    this.fetchUrl = options.fetchUrl
    this.messages = { ...defaultMessages, ...moduleConfig.messages, ...options.messages }
    this.headers = { ...options.headers }
    this.stringify = options.stringify ?? false
    this.state = { status: 'idle' }
    this.shown = computed(() => this.state?.status === 'idle' || this.state?.status === 'error')
    this.response = null
    this.data = useState<{ [key: string]: string }>(`${this.fetchUrl}.data`, () => {})
    this.rules = useState<{ [key: string]: unknown }>(`${this.fetchUrl}.rules`, () => {})
    this.dataHandler = new FormDataHandler(this.fetchUrl)
  }

  get fetchParams () {
    return {
      key: String(Date.now()),
      headers: this.headers,
      method: this.method,
      body: (this.stringify) ? this.data : JSON.stringify(this.data)
    }
  }

  mutateState (status: FormBuilder.Status, errorType?: FormBuilder.ErrorType | string) {
    this.state = { status, errorType }
  }
}
