import type axios from 'axios';
import { mockAxios } from '../test/mock-axios';
import { AxiosHttpClient } from './axios-http-client';
import { mockHttpRequest } from '../../data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut();

    await sut.request(mockHttpRequest());

    expect(mockedAxios.request).toHaveBeenCalledWith(mockHttpRequest());
  });

  test('should return correct response', async () => {
    const { sut, mockedAxios } = makeSut();

    const response = await sut.request(mockHttpRequest());
    const AxiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(response).toEqual({
      statusCode: AxiosResponse.status,
      body: AxiosResponse.data
    });
  });

  test('should return correct error', async () => {
    const { sut, mockedAxios } = makeSut();
    const errorMessage = 'An error occurred';
    mockedAxios.request.mockRejectedValueOnce({
      response: {
        status: 500,
        data: { error: errorMessage }
      }
    });

    const response = await sut.request(mockHttpRequest());

    expect(response).toEqual({
      statusCode: 500,
      body: { error: errorMessage }
    });
  });
});
