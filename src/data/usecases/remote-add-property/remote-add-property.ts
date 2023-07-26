import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { type PropertyModel } from '../../../domain/models';
import { type AddProperty } from '../../../domain/usecases/add-property';
import { type AddPropertyDTO } from '../../dtos/add-property';
import { type HttpClient } from '../../interfaces';
import { type HttpRequest, HttpStatusCode } from '../../types';
import { type LogReportHelper } from '../../util';

export class RemoteAddProperty implements AddProperty {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient,
    private readonly logReportHelper: LogReportHelper
  ) {
    this.url = url;
    this.httpClient = httpClient;
    this.logReportHelper = logReportHelper;
  }

  async add (data: AddPropertyDTO): Promise<PropertyModel> {
    let text = '';
    switch (data.previous) {
      case true: text = 'Creating new property for previous user'; break;
      default: text = 'Creating new property';
    }
    await this.logReportHelper.logStart(text);

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
        const { id, box, address, client } = httpResponse.body;
        const response: PropertyModel = { id, box, address, client };
        await this.logReportHelper.logSuccess('Property was successfully created', response);
        return response;
      }
      default: {
        const error = new UnexpectedError(httpResponse.body.message);
        await this.logReportHelper.logError('An error occurred during property creation', error);
        throw error;
      }
    }
  }
}
