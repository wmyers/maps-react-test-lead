import axios from 'axios';
import { cache } from './cache';

const CACHE_KEY = 'BOE_INTEREST_RATE';
export const FALLBACK_RATE = 4.75; // if all else fails...

export async function getBankRate(): Promise<number> {
  // Fetching BoE rate seems to be flakey at certain times of the year (see note below about 31st Dec 2024)
  // So defaulting to 5.0 just in case
  let rate = FALLBACK_RATE;
  try {
    // Try to get the rate from cache first
    const cachedRate = cache.get<number>(CACHE_KEY);
    if (cachedRate !== undefined) {
      return cachedRate;
    }

    const now = Date.now();
    // use 31st Dec 2024 as a start date for the range of column values of BoE interest rates
    // this date definitely has the most recent rate attached to it (at the time of writing)
    // setting a range any sooner can lead to no columns being sent by the asp endpoint
    const then = new Date('31 Dec 2024 00:00:01 GMT').valueOf();
    // const then = now - 1000 * 60 * 60 * 24 * 31; // at least one month ago

    const [, now_month, now_date, now_year] = new Date(now).toDateString().split(' ');
    const [, then_month, then_date, then_year] = new Date(then).toDateString().split(' ');

    // If not in cache, fetch from BOE
    // NB possibly this asp endpoint doesn't like the URL encoding that axios applies to separately defined params...
    // so defining this as a url string:
    const url = `https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=${then_date}/${then_month}/${then_year}&Dateto=${now_date}/${now_month}/${now_year}&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;
    // setting timeout of 500ms to not block the ui at the start
    // NB we can't use React.Suspense to handle a longer load time as that doesn't work when JS is disabled
    const response = await axios.get(url, { timeout: 500 });

    // Split the CSV response into lines
    const lines = response.data.split('\n');

    // Get the last non-empty line (most recent rate)
    const dataLine = lines.filter((line: string) => line.trim()).pop();

    // Extract the rate from the last column
    const extractedRate = parseFloat(dataLine.split(',')[1]);

    // check for NaN values and any other falsy values derived from wonky data
    if (!extractedRate) {
      throw new Error(`ERROR extracted BOE rate is ${extractedRate}`);
    }

    rate = extractedRate;

    // Store in cache
    cache.set(CACHE_KEY, rate);
  } catch (error) {
    console.error('Error fetching Bank of England rate:', error);
  }
  return rate;
}
