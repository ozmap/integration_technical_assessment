import { UnexpectedError } from '../../../domain/errors/unexpected-error';
import { LogReportHelper, addClientLogError, addClientLogStart, addClientLogSuccess } from '../../../util';
import { HttpClientSpy, LoggerSpy, ReporterSpy, mockAddClientApiResponse, mockAddClientDTO, mockClientModel } from '../../test';
import { HttpStatusCode, ReportStatus, type ReportEntry } from '../../types';
import { RemoteAddClient } from './remote-add-client';

type SutTypes = {
  sut: RemoteAddClient
  httpClientSpy: HttpClientSpy
  loggerSpy: LoggerSpy
  reporterSpy: ReporterSpy
};

const makeSut = (url: string = 'any_url'): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  httpClientSpy.response = {
    statusCode: HttpStatusCode.created,
    body: mockAddClientApiResponse
  };
  const loggerSpy = new LoggerSpy();
  const reporterSpy = new ReporterSpy();
  const logReportHelper = new LogReportHelper(loggerSpy, reporterSpy);
  const sut = new RemoteAddClient(url, httpClientSpy, logReportHelper);
  return {
    sut,
    httpClientSpy,
    loggerSpy,
    reporterSpy
  };
};

describe('RemoteAddClient', () => {
  test('should call HttpClient with correct values', async () => {
    const url = 'another_url';
    const { sut, httpClientSpy } = makeSut(url);

    await sut.add(mockAddClientDTO);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('post');
  });

  test('should throw UnexpectedError if HttpClient returns an http error response', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: { message: 'Uh oh, something has gone wrong.' }
    };

    const response = sut.add(mockAddClientDTO);

    await expect(response).rejects.toThrow(new UnexpectedError(httpClientSpy.response.body.message));
  });

  test('should call Logger.info() with correct value', async () => {
    const { sut, loggerSpy } = makeSut();
    const infoSpy = jest.spyOn(loggerSpy, 'info');

    await sut.add(mockAddClientDTO);

    expect(infoSpy).toHaveBeenCalledWith({ message: addClientLogStart() });
  });

  test('should call Reporter.append() with correct values if HttpClient returns 201', async () => {
    const { sut, reporterSpy } = makeSut();
    const appendSpy = jest.spyOn(reporterSpy, 'append');

    const reportEntry: ReportEntry = {
      action: addClientLogSuccess(),
      status: ReportStatus.sucess,
      data: mockClientModel
    };

    await sut.add(mockAddClientDTO);

    expect(appendSpy).toHaveBeenCalledWith(reportEntry);
  });

  test('should call Reporter.append() with correct values if HttpClient returns an http error response', async () => {
    const { sut, httpClientSpy, reporterSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: { message: 'Uh oh, something has gone wrong.' }
    };
    const appendSpy = jest.spyOn(reporterSpy, 'append');

    let error: Error;

    try {
      await sut.add(mockAddClientDTO);
    } catch (err) {
      error = err;
    }

    const reportEntry: ReportEntry = {
      action: addClientLogError(),
      status: ReportStatus.error,
      data: error,
      message: error.message
    };

    expect(appendSpy).toHaveBeenCalledWith(reportEntry);
  });

  test('should call Logger.error() if HttpClient returns an http error response', async () => {
    const { sut, httpClientSpy, loggerSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body: { message: 'Uh oh, something has gone wrong.' }
    };

    try {
      await sut.add(mockAddClientDTO);
    } catch (error) {
    }

    expect(loggerSpy.method).toBe('error');
    expect(loggerSpy.log).toEqual({
      message: addClientLogError(),
      error: new UnexpectedError(httpClientSpy.response.body.message)
    });
  });

  test('should call Logger.info() with user data if HttpClient returns 201', async () => {
    const { sut, loggerSpy } = makeSut();
    const infoSpy = jest.spyOn(loggerSpy, 'info');

    await sut.add(mockAddClientDTO);

    expect(infoSpy).toHaveBeenCalledWith({
      message: addClientLogSuccess(),
      data: mockClientModel
    });
  });

  test('should return ClientModel if HttpClient returns 201', async () => {
    const { sut } = makeSut();

    const response = await sut.add(mockAddClientDTO);

    expect(response).toEqual(mockClientModel);
  });
});
