import run from "aocrunner";

type Stone = {
  value: string;
  count: number;
};

function parseInput(rawInput: string) {
  return rawInput.split(" ").map((num) => ({ value: num, count: 1 }));
}

function blink(time: number, stones: Stone[]) {
  let temp = [...stones];
  for (let i = 0; i < time; i++) {
    temp = temp.flatMap((stone) => {
      if (stone.value === "0") {
        return { value: "1", count: stone.count };
      } else if (stone.value.length % 2 === 0) {
        let first = stone.value.slice(0, stone.value.length / 2);
        let second = parseFloat(
          stone.value.slice(stone.value.length / 2, stone.value.length),
        ).toString();
        return [
          { value: first, count: stone.count },
          { value: second, count: stone.count },
        ];
      } else {
        return {
          value: (parseInt(stone.value) * 2024).toString(),
          count: stone.count,
        };
      }
    });
    temp = temp.reduce((acc: Stone[], item) => {
      let existingStone = acc.find((stone) => stone.value === item.value);
      if (existingStone) {
        let pos = acc.indexOf(existingStone);
        acc[pos] = {
          value: existingStone.value,
          count: existingStone.count + item.count,
        };
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  }
  return temp;
}

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  let total = 0;

  function solution1(input: Stone[]) {
    let result = blink(25, input);
    result.forEach((stone) => {
      total += stone.count;
    });
  }

  solution1(input);

  return total;
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  let total = 0;

  function solution2(input: Stone[]) {
    let result = blink(75, input);
    result.forEach((stone) => {
      total += stone.count;
    });
  }

  solution2(input);

  return total;
}

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
