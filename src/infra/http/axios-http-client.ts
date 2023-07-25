import axios from 'axios';
import { type HttpClient } from '../../data/interfaces';
import { type HttpRequest, type HttpResponse } from '../../data/types';

export class AxiosHttpClient implements HttpClient {
  async request (request: HttpRequest): Promise<HttpResponse<any>> {
    await axios.request(request);
    return null;
  }
}
