import axios, { type AxiosResponse } from 'axios';
import { type HttpClient } from '../../data/interfaces';
import { type HttpRequest, type HttpResponse } from '../../data/types';

export class AxiosHttpClient implements HttpClient {
  async request (request: HttpRequest): Promise<HttpResponse> {
    const axiosResponse: AxiosResponse = await axios.request(request);
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
