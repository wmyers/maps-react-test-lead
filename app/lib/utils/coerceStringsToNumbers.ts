import { FormInput, FormValues } from './../definitions';

export function isFormInputKey(key: string): key is keyof FormInput {
  return ['price', 'deposit', 'term', 'interest'].includes(key);
}

export default function coerceInputStringsToNumericValues(input: FormInput): FormValues {
  try {
    const entries = Object.keys(input).filter(isFormInputKey);

    const values = entries.reduce<FormValues>((acc, key) => {
      acc[key] = Number(input[key]);
      return acc;
    }, {} as FormValues);

    const numbers = Object.values(values);

    if (
      numbers.length === 0 ||
      numbers.some(
        (num) => Number.isNaN(num) || !!num === false || typeof num !== 'number',
      )
    ) {
      throw new Error(
        'Invalid string to coerce to number in coerceInputStringsToNumericValues',
      );
    }
    return values;
  } catch (e) {
    throw e;
  }
}
