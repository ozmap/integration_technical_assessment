import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { HttpClientSpy, LoggerSpy, mockUserModel } from '../../test';
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

  test('should throw UnexpectedError if HttpClient returns an http error response', async () => {
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
    const infoSpy = jest.spyOn(loggerSpy, 'info');

    await sut.get();

    expect(infoSpy).toHaveBeenCalledWith({ message: 'Retrieving new user information' });
  });

  test('should call Logger.error() if HttpClient returns an http error response', async () => {
    const { sut, httpClientSpy, loggerSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: { error: 'Uh oh, something has gone wrong.' }
    };

    try {
      await sut.get();
    } catch (error) {
    }

    expect(loggerSpy.method).toBe('error');
    expect(loggerSpy.log).toEqual({
      message: 'An error occurred during user information retrieval',
      error: new UnexpectedError(httpClientSpy.response.body.error)
    });
  });

  test('should call Logger.info() with user data if HttpClient returns 200', async () => {
    const { sut, loggerSpy } = makeSut();
    const infoSpy = jest.spyOn(loggerSpy, 'info');

    await sut.get();

    expect(infoSpy).toHaveBeenCalledWith({
      message: 'User information was successfully retrieved',
      data: mockUserModel()
    });
  });

  test('should return UserModel if HttpClient returns 200', async () => {
    const { sut } = makeSut();

    const response = await sut.get();

    expect(response).toEqual(mockUserModel());
  });
});
