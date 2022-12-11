// NOTE: These implementations would have to be polyfilled for IE support!

function* iter_range(begin, end, step) {
  // Normalize our inputs
  step = step ? step : 1;

  if (typeof end === "undefined") {
    end = begin > 0 ? begin : 0;
    begin = begin < 0 ? begin : 0;
  }

  if (begin == end) {
    return;
  }

  if (begin > end) {
    step = step * -1;
  }

  for (let x = begin; x < end; x += step) {
    yield x;
  }
}

export function range(begin, end, step) {
  return Array.from(iter_range(begin, end, step));
}

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

export function extractFc(idFc, allFc) {
  const regex = /<h4>(.*)<\/h4>/;
  const obj = allFc.find((o) => o.name === idFc);
  let m;
  let value = "-";

  if (obj && (m = regex.exec(obj.val)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match) => {
      value = match;
    });
  }

  return value;
}

export function isBypassActive(idBypass, allBypass) {
  const obj = allBypass.find((o) => o.name === idBypass);
  let value = 0;

  if (obj) {
    value = obj.val;
  }

  return value;
}

export function bypassSet(bypassId, bypassAll, value) {
  console.log(bypassId, bypassAll, value);
  const obj = bypassAll.find((o) => o.name === bypassId);
  obj.value = value;
}
