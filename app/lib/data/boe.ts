import axios from 'axios';
import { cache } from './cache';

const CACHE_KEY = 'BOE_INTEREST_RATE';

export async function getBankRate(): Promise<number> {
  try {
    // Try to get the rate from cache first
    const cachedRate = cache.get<number>(CACHE_KEY);
    if (cachedRate !== undefined) {
      return cachedRate;
    }

    const now = Date.now();
    const then = now - (1000 * 60 * 60 * 24 * 31); // at least one month ago - otherwise it doesn't work!
    const [now_day, now_month, now_date, now_year] = new Date(now).toDateString().split(' ');
    const [then_day, then_month, then_date, then_year] = new Date(then).toDateString().split(' ');

    // If not in cache, fetch from BOE
    // NB possibly this asp endpoint doesn't like the URL encoding that axios applies to separately defined params...
    // so defining this as a url string
    const url = `https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=${then_date}/${then_month}/${then_year}&Dateto=${now_date}/${now_month}/${now_year}&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N`;
    // const response = await axios.get(
    //   'https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp',
    //   {
    //     params: {
    //       'csv.x': 'yes',
    //       Datefrom: `${then_date}/${then_month}/${then_year}`,
    //       Dateto: `${now_date}/${now_month}/${now_year}`,
    //       SeriesCodes: 'IUMABEDR',
    //       CSVF: 'TN',
    //       UsingCodes: 'Y',
    //       VPD: 'Y',
    //       VFD: 'N'
    //     }
    //   }
    // );
    const response = await axios.get(url);

    // Split the CSV response into lines
    const lines = response.data.split('\n');

    // Get the last non-empty line (most recent rate)
    const dataLine = lines.filter((line: string) => line.trim()).pop();
    
    // Extract the rate from the last column
    const rate = parseFloat(dataLine.split(',')[1]);
    
    // Store in cache
    cache.set(CACHE_KEY, rate);
    
    return rate;
  } catch (error) {
    console.error('Error fetching Bank of England rate:', error);
    throw error;
  }
} 