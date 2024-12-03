#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  let result = 0
  input.split("\n").forEach((linha) => {
    const listaLinha = linha.split(' ').map(Number);
    if (part === 1) {
      if (listaLinha.every((val, i) => i === 0 || (listaLinha[i - 1] < val && Math.abs(listaLinha[i - 1] - val) < 4))) {
        result += 1;
      } else if (listaLinha.every((val, i) => i === 0 || (listaLinha[i - 1] > val && Math.abs(listaLinha[i - 1] - val) < 4))) {
        result += 1;
      }
    } else {
      // ascendente
      let flag = 0;
      for (let i = 0; i < listaLinha.length; i++) {
        if (listaLinha[i-1] < listaLinha[i]) {
          continue;
        } else if (listaLinha[i-1] )  {

          flag += 1
        }


        console.log(i)
      }
    }
    
  });
  return result;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));
