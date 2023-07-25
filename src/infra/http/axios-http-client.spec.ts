import { type HttpRequest } from '../../data/types';
import { mockAxios } from '../test/mock-axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request: HttpRequest = {
      method: 'post',
      url: 'any_url',
      body: { field: 'any_body_value' },
      headers: { field: 'any_header_value' },
      data: { field: 'any_data_value' }
    };
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith(request);
  });
});
