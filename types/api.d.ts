// api接口响应数据标准格式
interface ApiResponseData<T> {
  code: number;
  data: T;
  message: string;
}
