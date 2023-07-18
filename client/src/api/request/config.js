export default {
  method: 'get',
  baseURL: 'http://localhost:8003',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
}
