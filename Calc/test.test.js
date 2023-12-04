const Calculator = require('./calculator.js');

const myCalculator = new Calculator();

describe(`Add function positive tests`, function() {
  test(`Should return the sum of two numbers`, async () => {
    const result = await myCalculator.add(1, 2);
    await expect(result).toEqual(3);
  });

  test(`Should return the sum of many numbers`, async () => {
    const result = await myCalculator.add(1, 2, 3, 4, 5);
    await expect(result).toEqual(15);
  });

  test(`Should summarize the negative numbers`, async () => {
    const result = await myCalculator.add(1, -2, 3, 4, -5);
    await expect(result).toEqual(1);
  });

  test(`Should summarize the decimal numbers`, async () => {
    const result = await myCalculator.add(0.5555, 10, 0.21, 4);
    await expect(result).toBeCloseTo(14.7655, 4);
  });

  describe(`Add function negative tests`, function() {
    test(`Should return 0 if there is no input`, async () => {
      const result = await myCalculator.add();
      await expect(result).toEqual(0);
    });

    test(`Should summarize the very small values`, async () => {
      const result = await myCalculator.add(Number.MIN_VALUE, 5, 4);
      await expect(result).toBeCloseTo(9);
    });

    test(`Should summarize 2 and more very small values`, async () => {
      const result = await myCalculator.add(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Number.MIN_VALUE);
    });

    test(`Should summarize the very big values`, async () => {
      const result = await myCalculator.add(Number.MAX_VALUE, 5, 4);
      await expect(result).toBe(Number.MAX_VALUE);
    });

    test(`Should summarize 2 and more very big values`, async () => {
      const result = await myCalculator.add(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      await expect(result).toBe(Infinity);
    });

    test(`Should summarize both very big and small values`, async () => {
      const result = await myCalculator.add(Number.MAX_VALUE, Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Number.MAX_VALUE);
    });
  });
});

describe(`Multiply function positive tests`, function() {
  test(`Should return the product of two numbers`, async () => {
    const result = await myCalculator.multiply(10, 10);
    await expect(result).toEqual(100);
  });

  test(`Should return the product of many numbers`, async () => {
    const result = await myCalculator.multiply(10, 5, 7, 44, 12, 1, 6, 18, 35, 101);
    await expect(result).toEqual(70552944000);
  });

  test(`Should multiply the negative numbers`, async () => {
    const result = await myCalculator.multiply(-2, 2, -2, 2, -2);
    await expect(result).toEqual(-32);
  });

  test(`Should multiply the decimal numbers`, async () => {
    const result = await myCalculator.multiply(0.55555555, 10, 0.21, 4);
    await expect(result).toBeCloseTo(4.66666662, 8);
  });

  test(`Should handle the big numbers`, async () => {
    const result = await myCalculator.multiply(9999, 8888, 1111);
    await expect(result).toEqual(98735805432);
  });

  test(`Should handle the big fraction numbers `, async () => {
    const result = await myCalculator.multiply(9999.999, 8888.888, 1111.111);
    await expect(result).toBeCloseTo(98765402469.13877);
  });

  describe(`Multiply function negative tests`, function() {
    test(`Should return the input number`, async () => {
      const result = await myCalculator.multiply(10);
      await expect(result).toEqual(10);
    });

    test(`Should return 1 if there is no input`, async () => {
      const result = await myCalculator.multiply();
      await expect(result).toEqual(1);
    });

    test(`Should return 0 if multiply by 0`, async () => {
      const result = await myCalculator.multiply(0, 5, 4);
      await expect(result).toEqual(0);
    });

    test(`Should multiply the very small values`, async () => {
      const result = await myCalculator.multiply(Number.MIN_VALUE, 5, 4);
      await expect(result).toBeCloseTo(0);
    });

    test(`Should multiply 2 and more very small values`, async () => {
      const result = await myCalculator.multiply(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Number.MIN_VALUE);
    });

    test(`Should multiply the very big values`, async () => {
      const result = await myCalculator.multiply(Number.MAX_VALUE, 5, 4);
      await expect(result).toBeCloseTo(Infinity);
    });

    test(`Should multiply the 2 and more very big values`, async () => {
      const result = await myCalculator.multiply(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
      await expect(result).toBe(Infinity);
    });

    test(`Should multiply both very big and small values`, async () => {
      const result = await myCalculator.multiply(Number.MAX_VALUE, Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Number.MIN_VALUE);
    });
  });
});

describe(`Substraction function positive tests`, function() {
  test(`Should return the difference of two numbers`, async () => {
    const result = await myCalculator.subtraction(10, 7);
    await expect(result).toEqual(3);
  });

  test(`Should substract from 0`, async () => {
    const result = await myCalculator.subtraction(0, 7);
    await expect(result).toEqual(-7);
  });

  test(`Should substract by 0`, async () => {
    const result = await myCalculator.subtraction(7, 0);
    await expect(result).toEqual(7);
  });

  test(`Should substract from one negative number`, async () => {
    const result = await myCalculator.subtraction(10, -5);
    await expect(result).toEqual(15);
  });

  test(`Should substract from two negative numbers`, async () => {
    const result = await myCalculator.subtraction(-10, -5);
    await expect(result).toEqual(-5);
  });

  test(`Should substract from the decimal numbers`, async () => {
    const result = await myCalculator.subtraction(-10.11, -5.11);
    await expect(result).toBeCloseTo(-5, 2);
  });

  test(`Should handle the big numbers`, async () => {
    const result = await myCalculator.subtraction(999999999, 888888888);
    await expect(result).toEqual(111111111);
  });

  test(`Should handle the big fraction numbers `, async () => {
    const result = await myCalculator.subtraction(999999999.999, 888888888.888);
    await expect(result).toBeCloseTo(111111111.111, 2);
  });

  test(`Should handle the small fraction numbers `, async () => {
    const result = await myCalculator.subtraction(0.00000055, 0.00066);
    await expect(result).toBeCloseTo(-0.00065945);
  });

  describe(`Substraction function negative tests`, function() {
    test(`Should't work with only 1 parameter`, async () => {
      const result = await myCalculator.subtraction(-10);
      await expect(result).toEqual(NaN);
    });

    test(`Should't work without parameters`, async () => {
      const result = await myCalculator.subtraction();
      await expect(result).toEqual(NaN);
    });

    test(`Should substract only 2 first parameters`, async () => {
      const result = await myCalculator.subtraction(10, 7, 10, 10);
      await expect(result).toEqual(3);
    });

    test(`Should handle the very small values`, async () => {
      const result = await myCalculator.subtraction(Number.MIN_VALUE, 5);
      await expect(result).toBeCloseTo(-5);
    });

    test(`Should handle the very big values`, async () => {
      const result = await myCalculator.subtraction(Number.MAX_VALUE, 5);
      await expect(result).toBeCloseTo(Number.MAX_VALUE);
    });

    test(`Should handle both very big and small values`, async () => {
      const result = await myCalculator.subtraction(Number.MAX_VALUE, Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Number.MAX_VALUE);
    });
  });
});

describe(`Divide function positive tests`, function() {
  test(`Should return the quotient of two numbers`, async () => {
    const result = await myCalculator.divide(10, 2);
    await expect(result).toEqual(5);
  });

  test(`Shouldn't divide by 0`, async () => {
    const result = await myCalculator.divide(10, 0);
    await expect(result).toEqual(Infinity);
  });

  test(`Should divide 0`, async () => {
    const result = await myCalculator.divide(0, 10);
    await expect(result).toEqual(0);
  });

  test(`Should divide the negative numbers`, async () => {
    const result = await myCalculator.divide(10, -5);
    await expect(result).toEqual(-2);
  });

  test(`Should divide by 1`, async () => {
    const result = await myCalculator.divide(10, 1);
    await expect(result).toEqual(10);
  });

  test(`Should divide number by itself`, async () => {
    const result = await myCalculator.divide(10, 10);
    await expect(result).toEqual(1);
  });

  test(`Should handle two negative numbers`, async () => {
    const result = await myCalculator.divide(-10, -5);
    await expect(result).toEqual(2);
  });

  test(`Should handle the decimal numbers`, async () => {
    const result = await myCalculator.divide(-10.05, 2);
    await expect(result).toEqual(-5.025);
  });

  test(`Should handle the big numbers`, async () => {
    const result = await myCalculator.divide(999999999, 888888888);
    await expect(result).toEqual(1.125);
  });

  test(`Should handle the big fraction numbers `, async () => {
    const result = await myCalculator.divide(999999999.999, 888888888.888);
    await expect(result).toEqual(1.125);
  });

  test(`Should handle the small fraction numbers `, async () => {
    const result = await myCalculator.divide(0.0000001, 0.0000002);
    await expect(result).toBeCloseTo(0.5);
  });

  describe(`Divide function negative tests`, function() {
    test(`Should't work with only 1 parameter`, async () => {
      const result = await myCalculator.divide(-10);
      await expect(result).toEqual(NaN);
    });

    test(`Should't work without parameters`, async () => {
      const result = await myCalculator.divide();
      await expect(result).toEqual(NaN);
    });

    test(`Should't divide 0 by 0`, async () => {
      const result = await myCalculator.divide(0, 0);
      await expect(result).toEqual(NaN);
    });

    test(`Should divide only 2 first parameters`, async () => {
      const result = await myCalculator.divide(10, 5, 10, 10);
      await expect(result).toEqual(2);
    });

    test(`Should handle the very small values`, async () => {
      const result = await myCalculator.divide(Number.MIN_VALUE, 5);
      await expect(result).toBeCloseTo(Number.MIN_VALUE);
    });

    test(`Should handle the very big values`, async () => {
      const result = await myCalculator.divide(5, Number.MAX_VALUE);
      await expect(result).toBeCloseTo(Number.MIN_VALUE);
    });

    test(`Should handle both very big and small values`, async () => {
      const result = await myCalculator.divide(Number.MAX_VALUE, Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Infinity);
    });
  });
});

describe(`Exponentiation function positive tests`, function() {
  test(`Should return the exponent of two numbers`, async () => {
    const result = await myCalculator.exponentiation(5);
    await expect(result).toEqual(25);
  });

  test(`Should exponent 0`, async () => {
    const result = await myCalculator.exponentiation(0);
    await expect(result).toEqual(0);
  });

  test(`Should exponent the negative numbers`, async () => {
    const result = await myCalculator.exponentiation(-5);
    await expect(result).toEqual(25);
  });

  test(`Should exponent the decimal numbers`, async () => {
    const result = await myCalculator.exponentiation(-5.05);
    await expect(result).toBeCloseTo(25.5, 2);
  });

  test(`Should exponent the big numbers`, async () => {
    const result = await myCalculator.exponentiation(999999);
    await expect(result).toEqual(999998000001);
  });

  test(`Should handle the big fraction numbers `, async () => {
    const result = await myCalculator.exponentiation(999999.999);
    await expect(result).toBeCloseTo(999999997999.9999);
  });

  test(`Should exponent the small numbers`, async () => {
    const result = await myCalculator.exponentiation(0.0001);
    await expect(result).toBeCloseTo(0.00000000001);
  });

  describe(`Exponentiation function negative tests`, function() {
    test(`Should't work without parameters`, async () => {
      const result = await myCalculator.exponentiation();
      await expect(result).toEqual(NaN);
    });

    test(`Should exponent only first parameter`, async () => {
      const result = await myCalculator.exponentiation(10, 5, 10, 10);
      await expect(result).toEqual(100);
    });

    test(`Should handle the very small values`, async () => {
      const result = await myCalculator.exponentiation(Number.MIN_VALUE);
      await expect(result).toBeCloseTo(Number.MIN_VALUE);
    });

    test(`Should handle the very big values`, async () => {
      const result = await myCalculator.exponentiation(Number.MAX_VALUE);
      await expect(result).toBeCloseTo(Infinity);
    });
  });
});
