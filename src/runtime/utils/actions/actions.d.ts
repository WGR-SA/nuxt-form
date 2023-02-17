declare namespace FormActions {

  import { UseFetchOptions, AsyncData } from '#app'

  interface Actions<DataT> {

    options: UseFetchOptions<DataT>

    async submit(): Promise<AsyncData<DataT>>
    async save(): Promise<AsyncData<DataT> | DataT | void>
    async update(): Promise<AsyncData<DataT> | DataT | void>
    async delete(): Promise<AsyncData<DataT> | DataT | void>
    async index(): Promise<AsyncData<DataT> | DataT | void>
    async get(id?: string): Promise<AsyncData<DataT> | DataT | void>
  }

  type methods = 'post' | 'update' | 'delete' | 'index' | 'get'
}


