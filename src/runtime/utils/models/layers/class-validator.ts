import BaseModelLayer from './base'

export default class ClassValidatorLayer extends BaseModelLayer {

  columns: FormModel.Column[] = []

  public getColumns = (model: { [key: string]: any }) => {
    this.columns = [] as FormInput.Container[]

    return this.mapLayer()
  }

  public mapLayer = (): FormInput.Container[] => {
    return this.columns.map((column) => {
      return {
        name: 'todo',
        label: 'todo',
      }
    })
  }
}