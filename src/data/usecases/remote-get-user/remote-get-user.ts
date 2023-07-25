import { type UserModel } from '../../../domain/models';
import { type GetUser } from '../../../domain/usecases';
import { type HttpClient } from '../../interfaces';
import { type HttpRequest } from '../../types';

export class RemoteGetUser implements GetUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {
    this.httpClient = httpClient;
  }

  async get (): Promise<UserModel> {
    const request: HttpRequest = {
      method: 'get',
      url: this.url
    };
    await this.httpClient.request(request);
    return null;
  }
}
