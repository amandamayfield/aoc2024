import run from "aocrunner";

function parseInput(rawInput: string) {
  const rules = rawInput
    .split("\n\n")[0]
    .split("\n")
    .map((num) => {
      let temp = num.split("|");
      return { one: parseInt(temp[0]), two: parseInt(temp[1]) };
    });
  const updates = rawInput
    .split("\n\n")[1]
    .split("\n")
    .map((num) => {
      return num.split(",").map((n) => parseInt(n));
    });
  return { rules: rules, updates: updates };
}

type Input = {
  rules: Rule[];
  updates: number[][];
};

type Rule = {
  one: number;
  two: number;
};

function part1(rawInput: string) {
  const input = parseInput(rawInput);

  function findRelevantRules(update: number[], rules: Rule[]) {
    return rules.filter((rule) => {
      const one = update.includes(rule.one);
      const two = update.includes(rule.two);
      return one && two;
    });
  }

  function checkUpdates(update: number[], rules: Rule[]) {
    let relevantRules = findRelevantRules(update, rules);

    let result = update.every((num, i) => {
      let numRules = relevantRules.filter((rule) => rule.one === num);
      let afterNum = update.slice(i + 1);

      return numRules.every((rule) => {
        return afterNum.includes(rule.two);
      });
    });
    return result;
  }

  let total = 0;

  function findMiddle(update: number[]) {
    const index = (update.length - 1) / 2;
    total += update[index];
  }

  function solution1(input: Input) {
    let correctUpdates = input.updates.filter((update) => {
      return checkUpdates(update, input.rules);
    });
    correctUpdates.forEach((update) => findMiddle(update));
  }

  solution1(input);

  return total;
}

function part2(rawInput: string) {
  const input = parseInput(rawInput);

  function findRelevantRules(update: number[], rules: Rule[]) {
    return rules.filter((rule) => {
      const one = update.includes(rule.one);
      const two = update.includes(rule.two);
      return one && two;
    });
  }

  function checkUpdates(update: number[], rules: Rule[]) {
    let relevantRules = findRelevantRules(update, rules);

    let result = update.every((num, i) => {
      let numRules = relevantRules.filter((rule) => rule.one === num);
      let afterNum = update.slice(i + 1);

      return numRules.every((rule) => {
        return afterNum.includes(rule.two);
      });
    });
    return !result;
  }

  let total = 0;

  function findMiddle(update: number[]) {
    const index = (update.length - 1) / 2;
    total += update[index];
  }

  function correctUpdate(update: number[], rules: Rule[]) {
    let relevantRules = findRelevantRules(update, rules);
    return [...update].sort((a, b) => {
      let rule = relevantRules.find((rule) => {
        return (
          (rule.one === a && rule.two === b) ||
          (rule.one === b && rule.two === a)
        );
      });
      return rule?.one === a ? -1 : 1;
    });
  }

  function solution2(input: Input) {
    let incorrectUpdates = input.updates.filter((update) => {
      return checkUpdates(update, input.rules);
    });
    let correctedUpdates = incorrectUpdates.map((update) =>
      correctUpdate(update, input.rules),
    );
    correctedUpdates.forEach((update) => findMiddle(update));
  }

  solution2(input);

  return total;
}

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
