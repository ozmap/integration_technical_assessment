import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { HttpClientSpy, LoggerSpy } from '../../test';
import { HttpStatusCode } from '../../types';
import { RemoteGetUser } from './remote-get-user';

type SutTypes = {
  sut: RemoteGetUser
  httpClientSpy: HttpClientSpy
  loggerSpy: LoggerSpy
};

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const loggerSpy = new LoggerSpy();
  const sut = new RemoteGetUser(url, httpClientSpy, loggerSpy);
  return {
    sut,
    httpClientSpy,
    loggerSpy
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

  test('should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: { error: 'Uh oh, something has gone wrong.' }
    };

    const response = sut.get();

    await expect(response).rejects.toThrow(new UnexpectedError(httpClientSpy.response.body.error));
  });

  test('should call Logger.info() with correct value', async () => {
    const { sut, loggerSpy } = makeSut();

    await sut.get();

    expect(loggerSpy.method).toBe('info');
    expect(loggerSpy.log).toEqual({ message: 'Retrieving new user information' });
  });
});
