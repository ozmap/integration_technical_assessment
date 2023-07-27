import { type Logger, type Reporter } from '../../data/interfaces';
import { type ReportEntry, ReportStatus } from '../../data/types';
import { type UnexpectedError } from '../../domain/errors/unexpected-error';

export class LogReportHelper {
  constructor (
    private readonly logger: Logger,
    private readonly reporter: Reporter
  ) {
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

  async logStart (action: string): Promise<void> {
    await this.handleLogAndReport({
      action,
      status: ReportStatus.pending
    });
  }

  async logSuccess (action: string, data: any): Promise<void> {
    await this.handleLogAndReport({
      action,
      status: ReportStatus.sucess,
      data
    });
  }

  async logError (action: string, error: UnexpectedError): Promise<void> {
    await this.handleLogAndReport({
      action,
      status: ReportStatus.error,
      data: error,
      message: error.message
    });
  }

  async generateReport (): Promise<void> {
    await this.reporter.generate();
  }
}
