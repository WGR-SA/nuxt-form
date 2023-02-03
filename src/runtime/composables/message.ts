import { useState, useRuntimeConfig } from '#app'
import { FormMessages, ValidatorMessages }  from '#imports'

interface FormMessageStore {
  key: string,
  form: { [lang: string]: FormBuilder.Messages }
  validators: { [lang: string]: { [key: string]: string } }
}

export const useFormMessage = () => {

  const messageStore = useState<FormMessageStore[]>('messages', () => [])
  const config = useRuntimeConfig()

  const initFormMessage = (key: string, messages?: Partial<FormBuilder.Messages>) => {
    
    const form = { ...FormMessages, ...{ [config.public.lang]: config.messages?.form }, ...{ [config.public.lang]: messages?.form }}
    const validators = { ...ValidatorMessages, ...{ [config.public.lang]: config.messages?.validators }, ...{ [config.public.lang]: messages?.validators } }
    messageStore.value.push({ key, form, validators })
  } 

  const getFormMessage = (key: string, type: 'form' | 'validators', path: string) => {
    const store = messageStore.value.find(store => store.key === key)
    if (!store) {
      throw new Error(`Message store with key ${key} not found`)
    }
    
    return resolvePath(path, store[type][config.public.form.lang]) ?? resolvePath(path, store[type]['en'])
  }

  const resolvePath = (path: string | string[], obj: any, separator = '.') => { 
    const properties = Array.isArray(path) ? path : path.split(separator); 
    return properties.reduce((prev, curr) => prev && prev[curr], obj); 
  }

  return {
    initFormMessage,
    getFormMessage
  }

}
