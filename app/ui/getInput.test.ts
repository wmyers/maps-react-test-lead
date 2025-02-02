import { getInput } from './getInput';
import { getBankRate } from '../lib/data/boe';

// Mock the getBankRate function
jest.mock('../lib/data/boe', () => ({
  getBankRate: jest.fn(),
}));

describe('getInput', () => {
  beforeEach(() => {
    // Reset mock before each test
    (getBankRate as jest.Mock).mockReset();
  });

  it('should use provided search params when available', async () => {
    (getBankRate as jest.Mock).mockResolvedValue(4.5);

    const searchParams = {
      price: '400000',
      deposit: '80000',
      term: '30',
      interest: '3.5',
    };

    const result = await getInput(searchParams);

    expect(result).toEqual(searchParams);
  });

  it('should use default values when search params are empty', async () => {
    (getBankRate as jest.Mock).mockResolvedValue(4.5);

    const result = await getInput({});

    expect(result).toEqual({
      price: '100000',
      deposit: '5000',
      term: '15',
      interest: '4.5',
    });
  });

  it('should use BOE rate when interest is not provided', async () => {
    (getBankRate as jest.Mock).mockResolvedValue(4.5);

    const searchParams = {
      price: '400000',
      deposit: '80000',
      term: '30',
      interest: '',
    };

    const result = await getInput(searchParams);

    expect(result.interest).toBe('4.5');
  });
});
