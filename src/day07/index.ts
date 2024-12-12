import run from "aocrunner";

type Calibration = {
  total: number;
  equation: number[];
};

function parseInput(rawInput: string) {
  return rawInput.split("\n").map((cal) => {
    let split = cal.split(": ");
    let nums = split[1].split(" ").map((n) => parseInt(n));
    return { total: parseInt(split[0]), equation: nums };
  });
}

function add(x: number, y: number) {
  return x + y;
}

function multiply(x: number, y: number) {
  return x * y;
}

function concat(x: number, y: number) {
  return parseInt(`${x}${y}`);
}

function minus(x: number, y: number) {
  return x - y;
}

function divide(x: number, y: number) {
  return x / y;
}

function checkOperators(expected: number, total: number, eq: number[]) {
  if (eq.length === 0) {
    return expected === total;
  }

  const num = eq[0];
  const remain = eq.slice(1);

  if (checkOperators(expected, add(total, num), remain)) {
    // console.log("add");
    return true;
  }
  if (checkOperators(expected, multiply(total, num), remain)) {
    // console.log("mul");
    return true;
  }

  return checkOperators(expected, concat(total, num), remain);
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  let total = 0;

  function solution1(input: Calibration[]) {
    let correct = input.filter((cal) => {
      return checkOperators(cal.total, cal.equation[0], cal.equation.slice(1));
    });
    correct.forEach((cal) => (total += cal.total));
  }

  solution1(input);

  return total;
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  let total = 0;

  function solution1(input: Calibration[]) {
    let correct = input.filter((cal) => {
      return checkOperators(cal.total, cal.equation[0], cal.equation.slice(1));
    });
    correct.forEach((cal) => (total += cal.total));
  }

  solution1(input);

  return total;
}

run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
