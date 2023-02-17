declare namespace FormActions {

  interface Actions<DataT> {

    submit(): void;

    post(): void;

    update(): void;

    delete(): void;

    get(id: string): DataT;

    index(): DataT;

    store(): void;
  }
}
