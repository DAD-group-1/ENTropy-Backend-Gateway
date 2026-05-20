export function assertObjectIsNumber(value: string): void {
  if (isNaN(Number(value))) {
    throw new TypeError(`Invalid value: ${value} is not a number`);
  }
}
