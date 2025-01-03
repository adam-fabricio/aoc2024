#!/usr/bin/env -S deno run --allow-read --allow-write

function solver(input: string, part: number) {
  const startPoints: [number, number][] = [];
  const endPoints: [number, number][] = [];
  const map: number[][] = input.split("\n").map((linha, l) => {
    return linha.split("").map((coluna, c) => {
      if (coluna === "0") startPoints.push([l, c]);
      if (coluna === "9") endPoints.push([l, c]);
      return Number(coluna);
    });
  });
  const linMax: number = map.length;
  const colMax: number = map[0].length;
  const scores: number[] = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  startPoints.forEach((start) => {
    let score = 0;
    endPoints.forEach((end) => {
      const toVisit: number[][] = [start];
      while (toVisit.length !== 0) {
        const step = toVisit.pop() ?? [0, 0];

        if (step[0] === end[0] && step[1] === end[1]) {
          score += 1;
          if (part === 1) break;
        }

        directions.forEach((dir) => {
          const newLine: number = dir[0] + step[0];
          if (newLine < 0 || newLine >= linMax) return;
          const newCol: number = dir[1] + step[1];
          if (newCol < 0 || newCol >= colMax) return;
          if (map[newLine][newCol] !== map[step[0]][step[1]] + 1) return;
          toVisit.push([newLine, newCol]);
        });
      }
    });

    scores.push(score);
  });

  return scores.reduce((val, acc) => val + acc);
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
