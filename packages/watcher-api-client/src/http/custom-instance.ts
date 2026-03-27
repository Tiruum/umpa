import Axios, { type AxiosError, type AxiosRequestConfig } from "axios"

export const AXIOS_INSTANCE = Axios.create({
  // В app можно переопределить через интерсептор или изменить baseURL при инициализации.
  baseURL: "/",
})

export type ErrorType<Error> = AxiosError<Error>

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()

  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  )

  // Orval использует cancel(), чтобы корректно отменять запросы через TanStack Query.
  // @ts-expect-error - техническое поле, ожидаемое кодом Orval
  promise.cancel = () => {
    source.cancel("Query was cancelled by TanStack Query / Orval")
  }

  return promise
}
