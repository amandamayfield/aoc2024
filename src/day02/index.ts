import run from "aocrunner";

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

function parseInput(rawInput: string) {
  return rawInput
    .split("\n")
    .map((report) => report.split(" ").map((num) => parseInt(num)));
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  function isAscending(report: number[]) {
    return report.every((num, i) => {
      if (report.length - 1 !== i) {
        return num < report[i + 1];
      } else {
        return true;
      }
    });
  }

  function isDescending(report: number[]) {
    return report.every((num, i) => {
      if (report.length - 1 !== i) {
        return num > report[i + 1];
      } else {
        return true;
      }
    });
  }

  function isClose(report: number[]) {
    return report.every((num, i) => {
      if (report.length - 1 !== i) {
        if (num > report[i + 1]) {
          return num - report[i + 1] <= 3;
        } else {
          return report[i + 1] - num <= 3;
        }
      } else {
        return true;
      }
    });
  }

  function checkLevels(report: number[]) {
    const ascending = isAscending(report);
    const descending = isDescending(report);
    if (!ascending && !descending) {
      return false;
    }
    const close = isClose(report);
    if (!close) {
      return false;
    }
    return true;
  }

  function solution1(reports: number[][]) {
    return reports.filter((report) => {
      return checkLevels(report);
    }).length;
  }

  return solution1(input);
}

function part2(rawInput: string) {
  // const input = parseInput(rawInput);
  const input = parseInput(testInput);

  function isAscending(report: number[]) {
    return report.every((num, i) => {
      if (report.length - 1 !== i) {
        return num < report[i + 1];
      } else {
        return true;
      }
    });
  }

  function isDescending(report: number[]) {
    return report.every((num, i) => {
      if (report.length - 1 !== i) {
        return num > report[i + 1];
      } else {
        return true;
      }
    });
  }

  function isClose(report: number[]) {
    return report.every((num, i) => {
      if (report.length - 1 !== i) {
        if (num > report[i + 1]) {
          return num - report[i + 1] <= 3;
        } else {
          return report[i + 1] - num <= 3;
        }
      } else {
        return true;
      }
    });
  }

  function checkLevels(report: number[]) {
    const ascending = isAscending(report);
    const descending = isDescending(report);
    if (!ascending && !descending) {
      return false;
    }
    const close = isClose(report);
    if (!close) {
      return false;
    }
    return true;
  }

  function solution2(reports: number[][]) {
    return reports.filter((report) => {
      return checkLevels(report);
    }).length;
  }

  return solution2(input);
}

run({
  part1: {
    tests: [
      {
        input: `
            7 6 4 2 1
            1 2 7 8 9
            9 7 6 2 1
            1 3 2 4 5
            8 6 4 4 1
            1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
            7 6 4 2 1
            1 2 7 8 9
            9 7 6 2 1
            1 3 2 4 5
            8 6 4 4 1
            1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
