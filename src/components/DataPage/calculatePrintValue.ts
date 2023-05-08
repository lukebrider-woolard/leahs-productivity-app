export function calculatePrintValue(sold: number, stock: number) {
  // print value to equal no. of sales / 4, but to not allow stock after print to equal more than 8
  return Math.max(Math.min(Math.ceil(sold / 4), 8 - stock), 0);
}
