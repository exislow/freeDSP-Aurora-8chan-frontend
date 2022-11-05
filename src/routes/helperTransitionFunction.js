export function logspace(a, b, len) {
  let arr, end, tmp, d;

  if (typeof a !== "number" || a !== a) {
    throw new TypeError(
      "logspace()::invalid input argument. Exponent of start value must be numeric."
    );
  }
  if (typeof b !== "number" || b !== b) {
    throw new TypeError(
      "logspace()::invalid input argument. Exponent of stop value must be numeric."
    );
  }
  if (arguments.length < 3) {
    len = 10;
  } else {
    if (!Number.isInteger(len) || len < 0) {
      throw new TypeError("logspace()::invalid input argument. Length must be a positive integer.");
    }
    if (len === 0) {
      return [];
    }
  }
  // Calculate the increment:
  end = len - 1;
  d = (b - a) / end;

  // Build the output array...
  arr = new Array(len);
  tmp = a;
  arr[0] = Math.pow(10, tmp);
  for (let i = 1; i < end; i++) {
    tmp += d;
    arr[i] = Math.pow(10, tmp);
  }
  arr[end] = Math.pow(10, b);
  return arr;
}
