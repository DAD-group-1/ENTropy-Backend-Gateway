export interface UpdateCommand<T> {
  id: number | string;
  updateData: T;
}
