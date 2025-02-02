import { z } from 'zod';
import type { FormInput } from '../definitions';

// Base schema for FormInput
const inputSchema = z
  .object({
    price: z.string(),
    deposit: z.string().optional().default('0'),
    term: z.string(),
    interest: z.string(),
  })
  .strict() satisfies z.ZodType<FormInput>;

// Validation schema for parsed values
export const parsedInputSchema = z.object({
  price: z.coerce.number().positive('Property price must be greater than 0'),

  deposit: z.coerce.number().min(0, 'Minimum  deposit is 0 (if remortaging)'),

  term: z.coerce
    .number()
    .int('Term must be a whole number')
    .min(2, 'Minimum term is 2 years')
    .max(40, 'Maximum term is 40 years'),

  interest: z.coerce.number().min(0, 'Interest rate cannot be negative'),
});

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
