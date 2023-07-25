import { type Logger } from '../interfaces';

export class LoggerSpy implements Logger {
  public method?: string;
  public log?: any;

  async info (log: any): Promise<void> {
    this.method = 'info';
    this.log = log;
  }
}
