
// TODO: use enum + constant typescript export pattern

export const CommonActions = {
  FETCH_FROM_SERVER: 'FETCH_FROM_SERVER',
};

enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  POST = 'POST',
}

export interface FetchFromServerAction {
  type: string;
  payload: {
    method: HttpMethod;
    endpoint: string;
    body?: object;
  };
}
