#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  const antenas = new Map<string, [number, number][]>();
  const linhas = input.split("\n");
  linhas.forEach((linha, l) => {
    linha.split("").forEach((char, c) => {
      if (char !== ".") {
        if(antenas.has(char)) {
          const cordenadas = antenas.get(char) ?? [];
          cordenadas.push([l, c])
          antenas.set(char, cordenadas)
        } else {
          antenas.set(char, [[l, c]])
        }
      }
    });
  });
  console.log(antenas)
  

}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));
