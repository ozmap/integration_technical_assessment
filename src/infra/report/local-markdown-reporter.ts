import { type ReportEntry } from '../../data/types';

export class LocalMarkdownReporter {
  private readonly entries: ReportEntry[];

  constructor () {
    this.entries = [];
  }
}
