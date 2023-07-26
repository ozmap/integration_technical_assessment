import { type ReportEntry } from '../../data/types';
import { LocalMarkdownReporter } from './local-markdown-reporter';

describe('LocalMarkdownReporter', () => {
  test('should instantiate with an empty array', () => {
    const sut = new LocalMarkdownReporter();

    const privateEntries = (sut as any).entries;

    expect(privateEntries).toEqual([]);
  });

  test('should add new ReportEntry object to entries', () => {
    const sut = new LocalMarkdownReporter();
    const privateEntries = (sut as any).entries;
    const data: ReportEntry = {
      action: 'Unit test',
      status: 'sucesso'
    };

    sut.append(data);

    expect(privateEntries).toEqual([data]);
  });
});
