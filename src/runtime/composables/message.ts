import { useState, useRuntimeConfig } from '#app'
import * as FormMessages from '../messages/form'
import * as ValidatorMessages from '../messages/validators'

interface FormMessageStore {
  key: string,
  form: { [lang: string]: FormBuilder.Messages }
  validators: { [lang: string]: { [key: string]: string } }
}

export const useFormMessage = () => {

  const messageStore = useState<FormMessageStore[]>('messages', () => [])
  const config = useRuntimeConfig()

  const initFormMessage = (key: string, messages?: Partial<FormBuilder.Messages>) => {
    
    const form = { ...FormMessages, ...{ [config.public.lang]: config.messages.form }, ...{ [config.public.lang]: messages?.form }}
    const validators = { ...ValidatorMessages, ...{ [config.public.lang]: config.messages.validators }, ...{ [config.public.lang]: messages?.validators } }
    messageStore.value.push({ key, form, validators })
  } 

  const getFormMessage = (key: string, type: 'form' | 'validators', path: string) => {
    const store = messageStore.value.find(store => store.key === key)
    if (!store) {
      throw new Error(`Message store with key ${key} not found`)
    }
    // TO DO - add support for nested paths && lng fallback
    return store[type][config.public.lang][path]
  }

  return {
    initFormMessage,
    getFormMessage
  }

}
