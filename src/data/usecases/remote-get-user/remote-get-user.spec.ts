import { HttpClientSpy } from '../../test';
import { RemoteGetUser } from './remote-get-user';

type SutTypes = {
  sut: RemoteGetUser
  httpClientSpy: HttpClientSpy
};

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteGetUser(url, httpClientSpy);
  return {
    sut,
    httpClientSpy
  };
};

describe('RemoteGetUser', () => {
  test('should call HttpClient with correct values', async () => {
    const url = 'another_url';
    const { sut, httpClientSpy } = makeSut(url);

    await sut.get();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });
});
