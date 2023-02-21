import { getMetadataStorage } from 'class-validator';
import BaseModelLayer from './base'

export default class ClassValidatorLayer extends BaseModelLayer {

  columns: FormModel.Column[] = []

  public getColumns = (model: { [key: string]: any }) => {
    // @ts-ignore TODO: fix this
    const metadata = getMetadataStorage().getTargetValidationMetadatas(model) ?? [] as FormInput.Container[]
    
    metadata.forEach((column) => {      
      const index = this.columns.findIndex((c) => c.name === column.propertyName)
      if (index !== -1) {
        this.columns[index].rules.push(this.detectRules(column))
        return
      }
      this.columns.push({
        name: column.propertyName,
        rules: [this.detectRules(column)],
      })
    })
    
    return this.columns as FormInput.Container[]
  }

  public detectRules: (column: FormModel.Column) => string[] = (column) => {
    return column.constraints ? {[column.name]: column.constraints} : column.name
  }
}