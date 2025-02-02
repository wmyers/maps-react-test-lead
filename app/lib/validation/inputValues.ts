import { z } from 'zod';
import type { FormInput } from '../definitions';

// Base schema for FormInput
const inputSchema = z
  .object({
    price: z.string(),
    deposit: z.string(),
    term: z.string(),
    interest: z.string(),
  })
  .strict() satisfies z.ZodType<FormInput>;

// Validation schema for parsed values
export const parsedInputSchema = z
  .object({
    price: z.coerce
      .number()
      .positive('Property price must be greater than 0')
      .max(100_000_000, 'Property price cannot exceed £100,000,000'),

    deposit: z.coerce.number().positive('Deposit must be greater than 0'),

    term: z.coerce
      .number()
      .int('Term must be a whole number')
      .min(5, 'Minimum term is 5 years')
      .max(40, 'Maximum term is 40 years'),

    interest: z.coerce
      .number()
      .min(0, 'Interest rate cannot be negative')
      .max(25, 'Interest rate cannot exceed 25% (we hope)'),
  })
  .refine(
    ({ deposit, price }) => deposit / price >= 0.05,
    'Minimum deposit is 5% of property price',
  )
  .refine(
    ({ deposit, price }) => deposit / price <= 0.95,
    'Maximum deposit is 95% of property price',
  );

// Type for the parsed and validated search params
export type ParsedInput = z.infer<typeof parsedInputSchema>;

// helper function
export function validateAndParseInput(input: FormInput) {
  const rawResult = inputSchema.safeParse(input);
  if (!rawResult.success) {
    return { success: false, error: rawResult.error };
  }
  return parsedInputSchema.safeParse({
    price: rawResult.data.price,
    deposit: rawResult.data.deposit,
    term: rawResult.data.term,
    interest: rawResult.data.interest,
  });
}
