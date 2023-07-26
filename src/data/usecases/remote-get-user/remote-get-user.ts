import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { type UserModel } from '../../../domain/models';
import { type GetUser } from '../../../domain/usecases';
import { type Logger, type HttpClient } from '../../interfaces';
import { type Reporter } from '../../interfaces/reporter';
import { HttpStatusCode, type HttpRequest, type ReportEntry, ReportStatus } from '../../types';

export class RemoteGetUser implements GetUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient,
    private readonly logger: Logger,
    private readonly reporter: Reporter
  ) {
    this.url = url;
    this.httpClient = httpClient;
    this.logger = logger;
    this.reporter = reporter;
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

  private async handleLogAndReport ({ action, status, message, data }: ReportEntry): Promise<void> {
    this.reporter.append({ action, status, message, data });
    switch (status) {
      case ReportStatus.error: { await this.logger.error({ message: action, error: data }); return; }
      default: { await this.logger.info({ message: action, data }); }
    }
  }

  async get (): Promise<UserModel> {
    await this.handleLogAndReport({
      action: 'Retrieving new user information',
      status: ReportStatus.pending
    });
    const request: HttpRequest = {
      method: 'get',
      url: this.url
    };
    const httpResponse = await this.httpClient.request(request);
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const [userData] = httpResponse.body.results;
        const user = this.mapResponseToUserModel(userData);
        await this.handleLogAndReport({
          action: 'User information was successfully retrieved',
          status: ReportStatus.sucess,
          data: user
        });
        return user;
      }
      default: {
        const error = new UnexpectedError(httpResponse.body.error);
        await this.handleLogAndReport({
          action: 'An error occurred during user information retrieval',
          status: ReportStatus.error,
          data: error,
          message: error.message
        });
        throw error;
      }
    }
  }
}
