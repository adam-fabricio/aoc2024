#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  let guardaDirecao = [-1, 0];
  let guarda = new Array();
  const obstaculo = new Set<string>();
  const caminho = new Set<string>();

  const linhas = input.split("\n");

  const linhaMax = linhas.length;
  const colunaMax = linhas[0].length;

  linhas.forEach((linha, l) => {
    linha.split("").forEach((char, c) => {
      if (char === "#") {
        obstaculo.add(`${l},${c}`);
      } else if (char === "^") {
        guarda = [l, c];
      }
    });
  });
  let result = 0;
  if (part === 1) {
    while (
      guarda[0] >= 0 && guarda[1] >= 0 && guarda[0] !== linhaMax &&
      guarda[1] !== colunaMax
    ) {
      caminho.add(`${guarda[0]},${guarda[1]}`);
      const proximoPasso = [
        guarda[0] + guardaDirecao[0],
        guarda[1] + guardaDirecao[1],
      ];

      if (obstaculo.has(`${proximoPasso[0]},${proximoPasso[1]}`)) {
        guardaDirecao = [guardaDirecao[1], -guardaDirecao[0]];
      } else {
        guarda = proximoPasso;
      }
    }
    return caminho.size;
  }
  const guardaInicial = [guarda[0], guarda[1]];
  for (let l = 0; l < linhaMax; l++) {
    for (let c = 0; c < colunaMax; c++) {
      if (obstaculo.has(`${l},${c}`)) {
        continue;
      }
      obstaculo.add(`${l},${c}`);

      guarda = [guardaInicial[0], guardaInicial[1]];
      guardaDirecao = [-1, 0];

      while (true) {
        caminho.add(`${guarda},${guardaDirecao}`);
        const proximoPasso = [
          guarda[0] + guardaDirecao[0],
          guarda[1] + guardaDirecao[1],
        ];

        if (obstaculo.has(`${proximoPasso[0]},${proximoPasso[1]}`)) {
          guardaDirecao = [guardaDirecao[1], -guardaDirecao[0]];
        } else {
          guarda = proximoPasso;
        }

        if (
          guarda[0] < 0 || guarda[1] < 0 || guarda[0] === linhaMax ||
          guarda[1] === colunaMax
        ) {
          break;
        }
        if (caminho.has(`${guarda},${guardaDirecao}`)) {
          result += 1;
          break;
        }
      }
      obstaculo.delete(`${l},${c}`);
      caminho.clear();
    }
  }
  return result;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
