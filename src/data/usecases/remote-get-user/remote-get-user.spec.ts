import { HttpClientSpy } from '../../test';
import { RemoteGetUser } from './remote-get-user';

describe('RemoteGetUser', () => {
  test('should call HttpClient with correct values', async () => {
    const httpClientSpy = new HttpClientSpy();
    const url = 'any_url';
    const sut = new RemoteGetUser(url, httpClientSpy);

    await sut.get();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });
});
