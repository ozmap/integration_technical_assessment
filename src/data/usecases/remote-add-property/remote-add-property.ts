import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { type PropertyModel } from '../../../domain/models';
import { type AddProperty } from '../../../domain/usecases/add-property';
import { type AddPropertyDTO } from '../../dtos/add-property';
import { type Reporter, type HttpClient, type Logger } from '../../interfaces';
import { type ReportEntry, ReportStatus, type HttpRequest, HttpStatusCode } from '../../types';

export class RemoteAddProperty implements AddProperty {
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

  private async handleLogAndReport ({ action, status, message, data }: ReportEntry): Promise<void> {
    this.reporter.append({ action, status, message, data });
    switch (status) {
      case ReportStatus.error: { await this.logger.error({ message: action, error: data }); return; }
      default: { await this.logger.info({ message: action, data }); }
    }
  }

  async add (data: AddPropertyDTO): Promise<PropertyModel> {
    await this.handleLogAndReport({
      action: 'Creating new property',
      status: ReportStatus.pending
    });
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
        await this.handleLogAndReport({
          action: 'Property was successfully created',
          status: ReportStatus.sucess,
          data: response
        });
        return response;
      }
      default: {
        const error = new UnexpectedError(httpResponse.body.message);
        await this.handleLogAndReport({
          action: 'An error occurred during property creation',
          status: ReportStatus.error,
          data: error,
          message: error.message
        });
        throw error;
      }
    }
  }
}
