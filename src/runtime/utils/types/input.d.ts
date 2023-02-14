declare namespace FormInput {
  interface Container {
    name: string,
    label: string,
    rules?: Array<string | { [key: string]: string[] }>,
    options?: { [key: string | number]: string },
    required?: boolean,
    checked?: boolean,
    value?: string,
    default?: string,
    type?: string,
    placeholder?: string,
    [key: string]: any
  }

  interface Text {
    name: string,
    label: string,
    rules?: string[],
    type?: string,
    required?: boolean,
    checked?: boolean,
    value?: string,
    placeholder?: string,
  }

  interface Radio extends Text {
    options: { [key: string | number]: string }
    default?: string
  }

  interface Select extends Text {
    options: { [key: string | number]: string }
  }

  interface Textarea extends Text {
    rows?: number,
  }

  interface Component {
    select: 'FormSelect',
    radio: 'FormRadio',
    textarea: 'FormTextarea',
    [key: string]: 'FormInput'
  }
}
