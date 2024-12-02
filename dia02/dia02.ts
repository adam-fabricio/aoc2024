#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  let result = 0
  input.split("\n").forEach((linha) => {
    const listaLinha = linha.split(' ').map(Number);
    if (listaLinha.every((val, i) => i === 0 || i === (listaLinha.length - 1) || (listaLinha[i - 1] < val && Math.abs(listaLinha[i - 1] - val) < 4) || (listaLinha[i - 2] < val && Math.abs(listaLinha[i - 2] - val) < 4))) {
      result += 1;
    } else if (listaLinha.every((val, i) => i === 0 || (listaLinha[i - 1] > val && Math.abs(listaLinha[i - 1] - val) < 4) || (listaLinha[i - 2] > val && Math.abs(listaLinha[i - 2] - val) < 4))) {
      result += 1;
    }
  });
  return result;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));
