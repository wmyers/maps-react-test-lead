/**
 * @jest-environment node
 */

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { getBankRate, FALLBACK_RATE } from './boe';
import { cache } from './cache';

// Mock the cache
jest.mock('./cache', () => ({
  cache: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

// Setup MSW server
const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe('getBankRate', () => {
  it('should return cached rate when available', async () => {
    // Mock cache hit
    (cache.get as jest.Mock).mockReturnValue(4.5);

    const rate = await getBankRate();

    expect(rate).toBe(4.5);
    expect(cache.get).toHaveBeenCalledWith('BOE_INTEREST_RATE');
  });

  it('should fetch and cache new rate when cache is empty', async () => {
    // Mock cache miss
    (cache.get as jest.Mock).mockReturnValue(undefined);

    // Mock BOE API response
    server.use(
      http.get(
        'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp*',
        () => {
          return HttpResponse.text(`
Date,Value
01/01/2024,5.25
02/01/2024,5.25
03/01/2024,5.25
        `);
        },
      ),
    );

    const rate = await getBankRate();

    expect(rate).toBe(5.25);
    expect(cache.get).toHaveBeenCalledWith('BOE_INTEREST_RATE');
    expect(cache.set).toHaveBeenCalledWith('BOE_INTEREST_RATE', 5.25);
  });

  it('should handle API errors gracefully', async () => {
    // Mock cache miss
    (cache.get as jest.Mock).mockReturnValue(undefined);

    // Mock API error
    server.use(
      http.get(
        'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp*',
        () => {
          return HttpResponse.error();
        },
      ),
    );

    const rate = await getBankRate();

    expect(rate).toBe(FALLBACK_RATE);
  });

  it('should handle malformed CSV response', async () => {
    // Mock cache miss
    (cache.get as jest.Mock).mockReturnValue(undefined);

    // Mock invalid CSV response
    server.use(
      http.get(
        'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp*',
        () => {
          return HttpResponse.text('Invalid,CSV\nData');
        },
      ),
    );

    const rate = await getBankRate();

    expect(rate).toBe(FALLBACK_RATE);
  });
});
