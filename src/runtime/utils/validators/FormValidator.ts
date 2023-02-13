import * as validators from '@vuelidate/validators'
import { FormMessageStore } from '#imports'

export class FormValidator {
  public rules: { [key: string]: any } = {}

  addRules(options: { name: string, rules: Array<string | { [key: string]: string[] }>, messages: FormMessageStore } ) {
    this.rules[options.name] = options.rules.map((r: string | { [key: string]: string[] }) => {
      if (typeof r === 'string') {
        return validators[r as keyof typeof validators]
      } else {
        const vkey = Object.keys(r)[0]
        // @ts-ignore TODO: Fix this
        return validators[vkey as keyof typeof validators](...r[vkey])
      }
    })   

    this.updateValidatorMessages(options.messages)
  }

  updateValidatorMessages(messages: FormMessageStore) {
    Object.keys(this.rules).map((field) => {
      this.rules[field].map((rule: any) => {
        const hasParams = typeof rule.$message !== 'string'
        rule.$message = messages.get(rule.$params.type, 'validators') ?? rule.$message

        if (hasParams) {
          Object.keys(rule.$params).map((param) => rule.$message = rule.$message.replace(`{${param}}`, rule.$params[param]))
        }
      })
    })
  }
}