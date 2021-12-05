import input from '../inputs/day-four.json';

type InputType = typeof input;

export class BingoBoard {
  board: number[];
  checked: boolean[] = Array.from({ length: 5 * 5 }).fill(false) as boolean[];

  constructor(input: number[]) {
    this.board = input;
  }
}

export const set = (bd: BingoBoard, n: number) => {
  const temporary = [...bd.checked];
  const i = bd.board.indexOf(n);
  if (i !== -1) temporary[i] = true;
  const out = new BingoBoard([]);
  out.board = bd.board;
  out.checked = temporary;
  return out;
};

const toChunk = <T>(input: T[]) => {
  const temporaryOut: T[][] = [];
  for (let i = 0; i < 5; i++) {
    const start = i * 5;
    temporaryOut.push(input.slice(start, start + 5));
  }

  return temporaryOut;
};

export const checkBoard = (bd: BingoBoard) => {
  const checked = toChunk(bd.checked);
  const row = checked.some((r) => r.every((v) => v));
  const col = Array.from({ length: 5 })
    .map((_, i) => checked.map((a) => a[i]))
    .some((c) => c.every((v) => v));
  /* const backward = Array.from({ length: 5 })
    .map((_, i) => checked[i][i])
    .every((v) => v); */
  /* const forward = Array.from({ length: 5 }).map(
    (_, i) => checked[4 - i][4 - i],
  ); */
  return row || col;
};

export const calculateWinningBoard = (bd: BingoBoard, lastCalled: number) => {
  const unmarked = bd.board.filter((_, i) => !bd.checked[i]);
  const sum = unmarked.reduce((a, b) => a + b, 0);
  return sum * lastCalled;
};

export function puzOne(input: InputType) {
  const n = input.numbers as number[];
  let boards = input.boards.map((b) => new BingoBoard(b)) as BingoBoard[];

  let index = 0;
  let lastCalled: number;
  let winners: boolean[] = [];
  let haveWinner = false;
  while (!haveWinner) {
    lastCalled = n[index];
    boards = boards.map((b) => set(b, lastCalled));
    winners = boards.map((b) => checkBoard(b));
    haveWinner = winners.some((v) => v);
    index++;
  }

  console.log(winners.indexOf(true));
  const winningBoard = boards[winners.indexOf(true)];
  console.log(winningBoard);
  console.log(lastCalled);

  return calculateWinningBoard(winningBoard, lastCalled);
}

export function puzTwo(input: InputType) {
  const n = input.numbers as number[];
  let boards = input.boards.map((b) => new BingoBoard(b)) as BingoBoard[];

  let index = 0;
  let lastCalled: number;
  let results = boards.map((b) => checkBoard(b));
  let losers = boards.filter((_, i) => !results[i]);
  let lastLoosers = losers;
  while (losers.length > 0) {
    lastCalled = n[index];
    boards = boards.map((b) => set(b, lastCalled));
    results = boards.map((b) => checkBoard(b));
    lastLoosers = [...losers];
    losers = boards.filter((_, i) => !results[i]);
    index++;
    console.log(`remaining:`, losers.length);
  }

  const losingBoard = set(lastLoosers[0], lastCalled);
  console.log(toChunk(losingBoard.checked));
  console.log(toChunk(losingBoard.board));
  console.log(lastCalled);

  return calculateWinningBoard(losingBoard, lastCalled);
}
