import { calculatePrintValue } from './calculatePrintValue';

const printValueTestCases = [
  [0, 0, 0],
  [1, 0, 1],
  [4, 0, 1],
  [8, 0, 2],
  [36, 0, 8],
  [36, 1, 7],
  [40, 0, 8],
  [40, 1, 7],
  [40, 5, 3],
  [40, 8, 0],
  [40, 10, 0],
  [0, 10, 0],
];

test.each(printValueTestCases)(
  'calculatePrintValue function correctly outputs print value',
  (sold: number, stock: number, expectedPrintValue: number) => {
    expect(calculatePrintValue(sold, stock)).toBe(expectedPrintValue);
  }
);
