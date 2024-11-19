import { FormMessageStore } from '#imports'

export class FormValidator {
  public rules: { [key: string]: any } = {}

  addRules(options: { name: string, rules: Array<string | { [key: string]: string[] }>, messages: FormMessageStore } ) {
    this.rules[options.name] = options.rules.map((r: string | { [key: string]: string[] }) => {      
      if (typeof r === 'string') {
        return { $params: { type: r }, $message: r }
      }
      const rule = Object.keys(r)[0]
      return { $params: { type: rule, options: [...r[rule]] }, $message: rule, custom_message: r.message }
    })   

    this.updateValidatorMessages(options.messages)
  }

  updateValidatorMessages(messages: FormMessageStore) {
    Object.keys(this.rules).map((field) => {
      this.rules[field].map((rule: any) => {
        rule.$message = messages.get(rule.$params.type, 'validators') ?? rule.$message

        if (rule.$params.options) {
          
          Object.keys(rule.$params.options).map((param) => {
            let validationLabelValue = rule.$params.options[param]
            if (['minDate', 'maxDate'].includes(rule.$params.type)) {
              validationLabelValue = new Date(rule.$params.options[param]).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(',', '')
            }
            rule.$message = rule.$message.replace(`{${param}}`, validationLabelValue)
          })
        }
      })
    })
  }
}