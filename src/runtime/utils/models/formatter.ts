import { FormatFactory } from './layers'

export class FormModelFormatter {
  private model: FormModel.Entity
  private layers: string[] = ['base']
  private columns: FormInput.Container[] = []

  constructor(model: FormModel.Entity, layers: string[]) {
    this.model = model
    this.layers = layers
  }

  public getFormInputs() {
    this.layers.forEach((layer) => {
      const layerInstance = new FormatFactory[layer]()
      console.log(layerInstance);
      console.log(layerInstance.getColumns(this.model));
      
      if (this.columns.length === 0) {
        this.columns = layerInstance.getColumns(this.model)
        return
      }
      layerInstance.getColumns(this.model).map((column: FormInput.Container) => {
        const index = this.columns.findIndex((c) => c.name === column.name)
        if (index === -1) {
          return
        }
        this.columns[index] = {
          ...this.omitColumnKeyWithNullValue(this.columns[index]),
          ...this.omitColumnKeyWithNullValue(column),
        }
      })
    })
    console.log(this.columns);
    

    return this.columns
  }

  public omitColumnKeyWithNullValue = (columns: FormInput.Container) => {
    return columns.map((column: FormInput.Container) => {
      Object.keys(column).forEach((key) => {
        if (column[key] === null) {
          delete column[key]
        }
      })
      return column
    })
  }
}