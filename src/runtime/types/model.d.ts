declare namespace FormModel {
  interface FormatLayer {
    columns: ModelColumn[]

    getColumns(model: ModelColumn[]): FormInput.Container[] | void
    mapLayer(column: ModelColumn): FormBuilder.Container
    detectRules(column: ModelColumn): string[] | null
    getType(column: ModelColumn): string
    getDefaultValue(column: ModelColumn): string
    getOptions(column: ModelColumn): {[key: string]: string}
    getComponent(column: ModelColumn): string
  }

  interface Column { // implements Partial<FormInput.Container>
    [key: string]: any
  }
  
  interface Entity {
    [key: string]: any
  }
}