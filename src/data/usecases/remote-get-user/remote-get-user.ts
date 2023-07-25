import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { type UserModel } from '../../../domain/models';
import { type GetUser } from '../../../domain/usecases';
import { type Logger, type HttpClient } from '../../interfaces';
import { HttpStatusCode, type HttpRequest } from '../../types';

export class RemoteGetUser implements GetUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient,
    private readonly logger: Logger
  ) {
    this.httpClient = httpClient;
  }

  async get (): Promise<UserModel> {
    await this.logger.info({ message: 'Retrieving new user information' });
    const request: HttpRequest = {
      method: 'get',
      url: this.url
    };
    const httpResponse = await this.httpClient.request(request);
    switch (httpResponse.statusCode) {
      case HttpStatusCode.serverError: throw new UnexpectedError(httpResponse.body.error);
      default: return null;
    }
  }
}
