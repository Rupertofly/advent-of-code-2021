type Input = number[];
type ChangeType = 'inc' | 'dec' | 'same';
type ChangeOutput = { change: ChangeType; message: string };
type Output = ChangeOutput[];
const languageMap: Record<ChangeType, string> = {
  dec: 'has decreased from',
  inc: 'has increased from',
  same: 'is the same as',
};
export function dayOnePuzOne(input: Input): Output {
  return input.map((value, i, array) => {
    if (i === 0) {
      return { change: 'same', message: `${value} is the first reading` };
    }

    const previousValue = array[i - 1];
    let change: ChangeType = 'inc';
    if (value === previousValue) change = 'same';
    else if (value < previousValue) change = 'dec';
    return {
      change,
      message: `${value} ${languageMap[change]} ${previousValue}`,
    };
  });
}

export function countIncreases(input: Output): number {
  return input.reduce((count, { change }) => {
    return count + (change === 'inc' ? 1 : 0);
  }, 0);
}

export function puzTwoWindows(input: Input): number[] {
  const windowSums: number[] = [];
  for (let i = 0; i < input.length - 2; i++) {
    windowSums.push(input[i] + input[i + 1] + input[i + 2]);
  }

  return windowSums;
}

export function countIncreses(input: Input) {
  return input.reduce((count, value, i, array) => {
    if (i === 0) return count;
    return count + (value > array[i - 1] ? 1 : 0);
  }, 0);
}
