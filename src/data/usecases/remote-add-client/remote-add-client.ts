import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { type ClientModel } from '../../../domain/models';
import { type AddClient } from '../../../domain/usecases';
import { type AddClientDTO } from '../../dtos';
import { type HttpClient } from '../../interfaces';
import { HttpStatusCode, type HttpRequest } from '../../types';
import { type LogReportHelper } from '../../util/log-report-helper';

export class RemoteAddClient implements AddClient {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient,
    private readonly logReportHelper: LogReportHelper
  ) {
    this.url = url;
    this.httpClient = httpClient;
    this.logReportHelper = logReportHelper;
  }

  async add (data: AddClientDTO): Promise<ClientModel> {
    await this.logReportHelper.logStart('Creating new client');
    const request: HttpRequest = {
      method: 'post',
      url: this.url,
      data,
      headers: {
        Authorization: process.env.API_KEY
      }
    };
    const httpResponse = await this.httpClient.request(request);
    switch (httpResponse.statusCode) {
      case HttpStatusCode.created: {
        const { id } = httpResponse.body;
        await this.logReportHelper.logSuccess('Client was successfully created', { id });
        return { id };
      }
      default: {
        const error = new UnexpectedError(httpResponse.body.message);
        await this.logReportHelper.logError('An error occurred during client creation', error);
        throw error;
      }
    }
  }
}
