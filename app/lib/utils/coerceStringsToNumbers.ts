export default function coerceStringsToNumbers(strings: Record<string, string>) {
  try {
    const numbers = Object.keys(strings).reduce(
      (numbers, key) => {
        numbers[key] = Number(strings[key]);
        return numbers;
      },
      {} as Record<string, number>,
    );
    const values = Object.values(numbers);
    if (values.length === 0 || values.some((num) => !!num === false)) {
      throw new Error(
        'Invalid string values to coerce to numbers in coerceStringsToNumbers',
      );
    }
    return numbers;
  } catch (e) {
    throw e;
  }
}
