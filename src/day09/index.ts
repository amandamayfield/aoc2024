import run from "aocrunner";

function parseInput(rawInput: string) {
  let numbers = rawInput.split("").map((str) => parseInt(str, 10));
  let blocks: string[] = [];
  numbers.forEach((num, i) => {
    if (i % 2 === 0) {
      for (let ind = 0; ind < num; ind++) {
        let pos = i / 2;
        blocks.push(pos.toString());
      }
    } else {
      for (let ind = 0; ind < num; ind++) {
        blocks.push(".");
      }
    }
  });
  return blocks;
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  function moveBlocks(input: string[]) {
    let temp = [...input];
    let left = temp.indexOf(".");
    let right = temp.length - 1;

    // when keeping track of two different postions in an array
    while (left <= right) {
      while (temp[right] === ".") {
        right--;
      }
      while (temp[left] !== ".") {
        left++;
      }
      if (left >= right) {
        break;
      }
      [temp[left], temp[right]] = [temp[right], temp[left]];
    }
    return temp;
  }

  let total = 0;

  function addBlocks(input: string[]) {
    input.forEach((num, i) => {
      if (num !== ".") {
        total += parseInt(num) * i;
      }
    });
  }

  function solution1(input: string[]) {
    const ordered = moveBlocks(input);
    addBlocks(ordered);
  }

  solution1(input);

  return total;
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  function moveBlocks(input: string[]) {
    let temp = [...input];
    console.log(temp);
    let left = temp.indexOf(".");
    let right = temp.length - 1;

    // when keeping track of two different postions in an array
    while (left <= right) {
      while (temp[right] === ".") {
        right--;
      }
      while (temp[left] !== ".") {
        left++;
      }
      if (left >= right) {
        break;
      }
      [temp[left], temp[right]] = [temp[right], temp[left]];
    }
    return temp;
  }

  let total = 0;

  function addBlocks(input: string[]) {
    input.forEach((num, i) => {
      if (num !== ".") {
        total += parseInt(num) * i;
      }
    });
  }

  function solution2(input: string[]) {
    const ordered = moveBlocks(input);
    // addBlocks(ordered);
  }

  solution2(input);

  return total;
}

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
