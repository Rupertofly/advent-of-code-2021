enum Commands {
  up = 'up',
  down = 'down',
  forward = 'forward',
}

export class Submarine {
  hor = 0;
  depth = 0;
  aim = 0;
  forward(amt: number) {
    this.hor += amt;
    this.depth += this.aim * amt;
    return this;
  }

  down(amt: number) {
    this.aim += amt;
  }

  up(amt: number) {
    this.aim -= amt;
  }
}
type SubCommand = { command: Commands; amt: number };
export function handle1stInput(input: string[]) {
  return input.map((v) => {
    const [cmd, distString] = v.split(' ');
    const output: SubCommand = {
      command: cmd as Commands,
      amt: Number.parseInt(distString, 10),
    };
    return output;
  });
}

export function walkPath(path: SubCommand[]) {
  const sub = new Submarine();
  for (const { command, amt } of path) {
    switch (command) {
      case Commands.forward:
        sub.forward(amt);
        break;
      case Commands.down:
        sub.down(amt);
        break;
      case Commands.up:
        sub.up(amt);
        break;
      default:
        break;
    }
  }

  return sub;
}

export function getPathMult(path: SubCommand[]) {
  const sub = walkPath(path);
  return sub.depth * sub.hor;
}
