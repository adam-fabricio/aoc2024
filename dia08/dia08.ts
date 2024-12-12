#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  const antenas = new Map<string, [number, number][]>();
  const linhas = input.split("\n");

  const linhasMax = linhas.length;
  const colunasMax = linhas[0].length;

  linhas.forEach((linha, l) => {
    linha.split("").forEach((char, c) => {
      if (char !== ".") {
        if (antenas.has(char)) {
          const cordenadas = antenas.get(char) ?? [];
          cordenadas.push([l, c]);
          antenas.set(char, cordenadas);
        } else {
          antenas.set(char, [[l, c]]);
        }
      }
    });
  });

  const antinodes = new Set<string>();
  for (const antena of antenas.values()) {
    antena.forEach(([a1l, a1c], a1) => {
      antena.forEach(([a2l, a2c], a2) => {
        if (a1 === a2) return;

        const deltaLinha = a1l - a2l;
        const deltaColuna = a1c - a2c;

        if (part === 1) {
          const antinodeLinha = a1l + deltaLinha;
          const antinodeColuna = a1c + deltaColuna;

          if (
            antinodeLinha < 0 || antinodeLinha >= linhasMax ||
            antinodeColuna < 0 || antinodeColuna >= colunasMax
          ) {
            return;
          }
          antinodes.add(`${a1l + deltaLinha},${a1c + deltaColuna}`);
        } else {
          let antinodeLinha = a1l + deltaLinha;
          let antinodeColuna = a1c + deltaColuna;
          antinodes.add(`${a1l},${a1c}`);

          while (
            antinodeLinha >= 0 && antinodeLinha < linhasMax &&
            antinodeColuna >= 0 && antinodeColuna < colunasMax
          ) {
            antinodes.add(`${antinodeLinha},${antinodeColuna}`);
            antinodeLinha += deltaLinha;
            antinodeColuna += deltaColuna;
          }
        }
      });
    });
  }
  return antinodes.size;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
