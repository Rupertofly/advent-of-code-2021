import puzInput from './inputs/day-one-puz-one-input.json';
import * as puzzleOne from './puzzles/day-one';

const results = puzzleOne.puzTwoWindows(puzInput);
const count = puzzleOne.countIncreses(results);
console.log(count);
