import axios, { type AxiosResponse } from 'axios';
import { type HttpClient } from '../../data/interfaces';
import { type HttpRequest, type HttpResponse } from '../../data/types';

export class AxiosHttpClient implements HttpClient {
  async request (request: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request(request);
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
