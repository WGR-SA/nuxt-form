import BaseModelLayer from './base'
import TypeORMLayer from './typeorm'
import ClassValidatoLayer from './class-validator'
import FormLayer from './form'

const FormatFactory: {[key: string]: any} = {
  base: BaseModelLayer,
  typeorm: TypeORMLayer,
  'class-validator': ClassValidatoLayer,
  form: FormLayer,
}

export {
  FormatFactory
}