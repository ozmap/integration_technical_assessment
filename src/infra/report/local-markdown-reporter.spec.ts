import { type ReportEntry } from '../../data/types';
import { LocalMarkdownReporter } from './local-markdown-reporter';

type SutTypes = {
  sut: LocalMarkdownReporter
  privateEntries: ReportEntry[]
};

const makeSut = (): SutTypes => {
  const sut = new LocalMarkdownReporter();
  const privateEntries = ((sut as any).entries as ReportEntry[]);

  return {
    sut,
    privateEntries
  };
};

describe('LocalMarkdownReporter', () => {
  test('should instantiate with an empty array', () => {
    const { privateEntries } = makeSut();

    expect(privateEntries).toEqual([]);
  });

  test('should add new ReportEntry object to entries', () => {
    const { sut, privateEntries } = makeSut();

    const data: ReportEntry = {
      action: 'Unit test',
      status: 'sucesso'
    };

    sut.append(data);

    expect(privateEntries).toEqual([data]);
  });
});
