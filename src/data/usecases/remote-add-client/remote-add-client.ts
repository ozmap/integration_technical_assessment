import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { type ClientModel } from '../../../domain/models';
import { type AddClient } from '../../../domain/usecases';
import { type AddClientDTO } from '../../dtos';
import { type HttpClient, type Logger } from '../../interfaces';
import { type Reporter } from '../../interfaces/reporter';
import { type ReportEntry, ReportStatus, type HttpRequest, HttpStatusCode } from '../../types';

export class RemoteAddClient implements AddClient {
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

  async add (data: AddClientDTO): Promise<ClientModel> {
    await this.handleLogAndReport({
      action: 'Creating new client',
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
        const { id } = httpResponse.body;
        await this.handleLogAndReport({
          action: 'Client was successfully created',
          status: ReportStatus.sucess,
          data: { id }
        });
        return { id };
      }
      default: {
        const error = new UnexpectedError(httpResponse.body.message);
        await this.handleLogAndReport({
          action: 'An error occurred during client creation',
          status: ReportStatus.error,
          data: error,
          message: error.message
        });
        throw error;
      }
    }
  }
}
