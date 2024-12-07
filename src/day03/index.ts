import run from "aocrunner";

const matcher = /(do(n't)?\(\)|mul\(([0-9]{1,3}),([0-9]{1,3})\))/g;

function parseInput(rawInput: string) {
  return rawInput.matchAll(matcher);
}

function part1(rawInput: string) {
  const input = [...parseInput(rawInput)];

  let result = 0;

  for (const match of input) {
    if (!match[0].startsWith("mul")) {
      continue;
    }
    result += parseInt(match[3]) * parseInt(match[4]);
  }

  return result;
}

function part2(rawInput: string) {
  const input = [...parseInput(rawInput)];

  let result = 0;
  let enabled = true;

  for (const match of input) {
    if (match[0] === "do()") {
      enabled = true;
      continue;
    } else if (match[0] === "don't()") {
      enabled = false;
      continue;
    } else if (enabled === false) {
      continue;
    }

    result += parseInt(match[3]) * parseInt(match[4]);
  }

  return result;
}

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
