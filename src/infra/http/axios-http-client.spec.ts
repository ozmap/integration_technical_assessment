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
});
