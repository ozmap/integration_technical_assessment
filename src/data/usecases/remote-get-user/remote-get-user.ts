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

  private mapResponseToUserModel ({ location, name, email }: any): UserModel {
    const streetName: string = location.street.name;
    const streetNumber: string = location.street.number;
    const postcode: string = location.postcode;
    const city: string = location.city;
    const state: string = location.state;
    const country: string = location.country;

    const addressArray = [streetName, streetNumber, postcode, city, state, country];
    const address = addressArray.join(' ');

    const userFirstName = name.first;
    const userLastName = name.last;

    const userArray = [userFirstName, userLastName];
    const user = userArray.join(' ');

    const code = userArray.map((item: string) => item.toLowerCase()).join('.');

    const observation = email;

    return {
      address,
      name: user,
      code,
      observation
    };
  };

  async get (): Promise<UserModel> {
    await this.logger.info({ message: 'Retrieving new user information' });
    const request: HttpRequest = {
      method: 'get',
      url: this.url
    };
    const httpResponse = await this.httpClient.request(request);
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const [userData] = httpResponse.body.results;
        const user = this.mapResponseToUserModel(userData);
        await this.logger.info({
          message: 'User information was successfully retrieved',
          data: user
        });
        return user;
      }
      case HttpStatusCode.serverError: {
        const error = new UnexpectedError(httpResponse.body.error);
        await this.logger.error({
          message: 'An error occurred during user information retrieval',
          error
        });
        throw error;
      }
      default: return null;
    }
  }
}
