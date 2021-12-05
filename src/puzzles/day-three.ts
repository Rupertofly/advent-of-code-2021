import puzInput from '../inputs/day-three-puz-one-input.json';

type BitCount = Array<{ ones: number; zeros: number }>;
export function bitCounts(input: string[]): BitCount {
  const size = input[0].length;
  const counts = Array.from({ length: size }).map(() => ({
    ones: 0,
    zeros: 0,
  }));
  for (const entry of input) {
    for (let i = 0; i < size; i++) {
      const bit = entry[i];
      if (bit === '1') counts[i].ones += 1;
      else counts[i].zeros += 1;
    }
  }

  return counts;
}

export function processCount(count: BitCount) {
  const gammaBits: string[] = [];
  const epsilonBits: string[] = [];
  for (const bit of count) {
    if (bit.ones >= bit.zeros) {
      gammaBits.push('1');
      epsilonBits.push('0');
    } else {
      gammaBits.push('0');
      epsilonBits.push('1');
    }
  }

  const gamma = Number.parseInt(gammaBits.join(''), 2);
  const epsilon = Number.parseInt(epsilonBits.join(''), 2);
  return gamma * epsilon;
}

export const puzOne = () => {
  const count = bitCounts(puzInput);
  const output = processCount(count);
  console.log(output);
};

export const oxyMask = (count: BitCount, i: number) =>
  count[i].ones >= count[i].zeros ? '1' : '0';
export const co2Mask = (count: BitCount, i: number) =>
  count[i].ones >= count[i].zeros ? '0' : '1';
export function getValue(
  input: string[],
  mask: (c: BitCount, i: number) => string
) {
  let choices = [...input];
  let currentBit = 0;
  while (choices.length > 1) {
    const keepBit = mask(bitCounts(choices), currentBit);
    choices = choices.filter((c) => c[currentBit] === keepBit);
    currentBit++;
  }

  const no = choices[0];
  return no;
}

export const puzTwo = () => {
  const oxygen = getValue(puzInput, oxyMask);
  const co2 = getValue(puzInput, co2Mask);
  console.log(Number.parseInt(oxygen, 2) * Number.parseInt(co2, 2));
};
