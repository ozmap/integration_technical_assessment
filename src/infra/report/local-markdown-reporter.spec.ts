import { ReportStatus, type ReportEntry } from '../../data/types';
import { LocalMarkdownReporter } from './local-markdown-reporter';

import fs from 'fs/promises';

jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
  mkdir: jest.fn()
}));

jest.useFakeTimers({ now: new Date('2023-01-01T10:30') });
const mockDateTime = '2023-01-01_10-30';

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

  describe('append()', () => {
    test('should add new ReportEntry object to entries', () => {
      const { sut, privateEntries } = makeSut();

      const data: ReportEntry = {
        action: 'Unit test',
        status: ReportStatus.sucess
      };

      sut.append(data);

      expect(privateEntries).toEqual([data]);
    });
  });
  describe('generate()', () => {
    it('should format the current date and time correctly', () => {
      const { sut } = makeSut();
      const formattedDate = ((sut as any).getCurrentDateTime() as string);

      expect(formattedDate).toMatch(mockDateTime);
    });

    it('should generate a valid file name', () => {
      const { sut } = makeSut();
      const formattedDate = ((sut as any).getFileName(mockDateTime) as string);

      expect(formattedDate).toBe(`relatorio_${mockDateTime}.md`);
    });

    it('should add the title with the correct datetime', () => {
      const { sut } = makeSut();
      ((sut as any).addTitle(mockDateTime));
      const reportTitle = ((sut as any).content as string);

      expect(reportTitle).toBe(`# Relatório de Execução - Data: ${mockDateTime}\n\n`);
    });

    it('should add content correctly', () => {
      const { sut } = makeSut();

      const entries: ReportEntry[] = [
        {
          action: 'action1',
          status: ReportStatus.error,
          message: 'Message for action1',
          data: { key1: 'value1' }
        },
        {
          action: 'action2',
          status: ReportStatus.error,
          message: 'Message for action2'
        },
        {
          action: 'action3',
          status: ReportStatus.sucess
        }
      ];

      entries.forEach((entry) => { sut.append(entry); });
      ((sut as any).addContent(mockDateTime));
      const content = ((sut as any).content as string);

      const expectedContent =
      '1. Ação: action1\n   ' +
        '- Status: erro\n   ' +
        '- Mensagem de Erro: Message for action1\n' +
          '\n   - Dados:\n\n      ```json\n' +
          '      {\n        "key1": "value1"\n      }\n' +
          '      ```\n\n' +
      '2. Ação: action2\n   ' +
        '- Status: erro\n   ' +
        '- Mensagem de Erro: Message for action2\n' +
      '3. Ação: action3\n   ' +
      '- Status: sucesso\n';

      expect(content).toBe(expectedContent);
    });

    test('should create folder if not exists', async () => {
      const { sut } = makeSut();
      const mkdirSpy = jest.spyOn(fs, 'mkdir');

      ((sut as any).getFolder());

      expect(mkdirSpy).toHaveBeenCalledWith('reports');
    });

    test('should save report as markdown with correct path', async () => {
      const { sut } = makeSut();
      const writeFileSpy = jest.spyOn(fs, 'writeFile');

      await sut.generate();
      const reportContent = `# Relatório de Execução - Data: ${mockDateTime}\n\n`;

      expect(writeFileSpy).toHaveBeenCalledWith(`reports/relatorio_${mockDateTime}.md`, reportContent);
    });

    test('should clear entries and content when report is saved', async () => {
      const { sut } = makeSut();

      await sut.generate();
      const reportContent = ((sut as any).content as string);
      const reportEntries = ((sut as any).entries as ReportEntry[]);

      expect(reportContent).toBe('');
      expect(reportEntries).toEqual([]);
    });
  });
});
