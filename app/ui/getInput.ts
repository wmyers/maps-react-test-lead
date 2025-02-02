import { getBankRate } from '../lib/data/boe';
import { SearchParams, FormInput } from '../lib/definitions';

export async function getInput(searchParams: SearchParams): Promise<FormInput> {
  const boeRate = await getBankRate();

  // string inputs from search params
  return {
    // default price to £100,000 if nullish search param
    price: searchParams?.price ?? '100000',
    // default deposit to £5,000 if nullish search param
    // NB this param is still optionally defaulting to 0 when parsed by zod
    deposit: searchParams?.deposit ?? '5000',
    // default term to 15 years if nullish search param
    term: searchParams?.term ?? '15',
    // always use boe rate as default
    interest: searchParams?.interest || boeRate.toString(),
  };
}
