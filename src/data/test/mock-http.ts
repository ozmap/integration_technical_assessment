import { type HttpClient } from '../interfaces';
import { type HttpMethod, type HttpResponse, HttpStatusCode, type HttpRequest } from '../types';

export class HttpClientSpy<R = any> implements HttpClient<R> {
  public method?: HttpMethod;
  public url?: string;
  public body?: any;
  public headers?: any;
  public data?: any;
  public response?: HttpResponse = {
    statusCode: HttpStatusCode.ok
  };

  async request (request: HttpRequest): Promise<HttpResponse> {
    this.method = request.method;
    this.url = request.url;
    this.headers = request.headers;
    this.data = request.data;
    return this.response;
  }
}
