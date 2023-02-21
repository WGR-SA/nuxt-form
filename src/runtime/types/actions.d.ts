import { UseFetchOptions, AsyncData } from '#app'

declare global {
  interface FormActions<DataT> {

    options: UseFetchOptions<DataT>

    submit(): Promise<AsyncData<DataT>>
    save(): Promise<AsyncData<DataT> | DataT | void>
    update(): Promise<AsyncData<DataT> | DataT | void>
    delete(): Promise<AsyncData<DataT> | DataT | void>
    index(): Promise<AsyncData<DataT> | DataT | void>
    get(id?: string): Promise<AsyncData<DataT> | DataT | void>
  }

  type FormActionsMethods = 'post' | 'update' | 'delete' | 'index' | 'get'
}