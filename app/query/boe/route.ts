import { getBankRate } from '@/app/lib/data/boe';

export async function GET() {
  try {
  	return Response.json(await getBankRate());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
