import { dateFunctions } from './date.functions';

describe('date.functions', () => {
  test('defineCreditDate', () => {
    const result = dateFunctions.defineCreditDate('2023-02-19');
    expect(result).toBe('2023-02-23');
  });
});
