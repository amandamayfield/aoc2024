import run from "aocrunner";

function parseInput(rawInput: string) {
  let list1: number[] = [];
  let list2: number[] = [];

  const stringNums = rawInput.split("\n").join("   ").split("   ");
  const nums = stringNums.map((string) => parseInt(string));
  nums.map((num, i) => {
    if (i % 2 === 0) {
      list1.push(num);
    } else {
      list2.push(num);
    }
  });

  return { left: list1, right: list2 };
}

function part1(rawInput: string) {
  const list1 = parseInput(rawInput).left;
  const list2 = parseInput(rawInput).right;

  function sortNum(list: number[]) {
    let listCopy = [...list];
    listCopy.sort(function (a, b) {
      return a - b;
    });
    return listCopy;
  }

  function comparePairs(list1: number[], list2: number[], i: number) {
    if (list1[i] >= list2[i]) {
      return list1[i] - list2[i];
    } else {
      return list2[i] - list1[i];
    }
  }

  let distance = 0;

  function solution1(list1: number[], list2: number[]) {
    let sortedList1 = sortNum(list1);
    let sortedList2 = sortNum(list2);
    for (let i = 0; i < list1.length; i++) {
      distance += comparePairs(sortedList1, sortedList2, i);
    }
  }

  solution1(list1, list2);
  return distance;
}

function part2(rawInput: string) {
  const list1 = parseInput(rawInput).left;
  const list2 = parseInput(rawInput).right;

  let similarity = 0;

  function solution2(list1: number[], list2: number[]) {
    list1.map((num1) => {
      let match = list2.filter((num2) => num2 === num1);
      if (match.length > 0) {
        similarity += match[0] * match.length;
      }
    });
  }

  solution2(list1, list2);
  return similarity;
}

run({
  part1: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        3   4
        4   3
        2   5
        1   3
        3   9
        3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
