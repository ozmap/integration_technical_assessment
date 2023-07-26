import { LocalMarkdownReporter } from './local-markdown-reporter';

describe('LocalMarkdownReporter', () => {
  test('should instantiate with an empty array', () => {
    const sut = new LocalMarkdownReporter();

    const privateEntries = (sut as any).entries;

    expect(privateEntries).toEqual([]);
  });
});
