#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function verificaAscendente(list: number[]): boolean {
  return list.every((item, i) =>
    i === 0 || (list[i - 1] < item && Math.abs(list[i - 1] - item) < 4)
  );
}

function verificaDescendente(list: number[]): boolean {
  return list.every((item, i) =>
    i === 0 || (list[i - 1] > item && Math.abs(list[i - 1] - item) < 4)
  );
}

function solver(input: string, part: number) {
  let result = 0;
  input.split("\n").forEach((linha) => {
    const listaLinha = linha.split(" ").map(Number);
    if (part === 1) {
      if (
        listaLinha.every((val, i) =>
          i === 0 ||
          (listaLinha[i - 1] < val && Math.abs(listaLinha[i - 1] - val) < 4)
        )
      ) {
        result += 1;
      } else if (
        listaLinha.every((val, i) =>
          i === 0 ||
          (listaLinha[i - 1] > val && Math.abs(listaLinha[i - 1] - val) < 4)
        )
      ) {
        result += 1;
      }
    } else {
      //console.log(result)
      let flag = 0;
      let removed = 0;
      // ascendente
      for (let i = 0; i < (listaLinha.length - 1); i++) {
        if (
          listaLinha[i] < listaLinha[i + 1] &&
          Math.abs(listaLinha[i] - listaLinha[i + 1]) < 4
        ) {
          continue;
        } else {
          removed = 1;
          const listasCorrigidas = [[
            ...listaLinha.slice(0, i),
            ...listaLinha.slice(i + 1),
          ], [...listaLinha.slice(0, i + 1), ...listaLinha.slice(i + 2)]];
          //console.log(listaLinha, i,  listasCorrigidas)
          for (const lista of listasCorrigidas) {
            if (verificaAscendente(lista)) {
              result += 1;
              flag = 1;
              break;
            }
          }
          break;
        }
      }
      if (removed === 0 && flag === 0) {
        result += 1;
      }
      removed = 0;

      //descendente
      if (flag != 1) {
        for (let i = 0; i < (listaLinha.length - 1); i++) {
          if (
            listaLinha[i] > listaLinha[i + 1] &&
            Math.abs(listaLinha[i] - listaLinha[i + 1]) < 4
          ) {
            continue;
          } else {
            removed = 1;
            const listasCorrigidas = [[
              ...listaLinha.slice(0, i),
              ...listaLinha.slice(i + 1),
            ], [...listaLinha.slice(0, i + 1), ...listaLinha.slice(i + 2)]];
            //console.log(listaLinha, i,  listasCorrigidas)
            for (const lista of listasCorrigidas) {
              if (verificaDescendente(lista)) {
                result += 1;
                flag = 1;
                break;
              }
            }
            break;
          }
        }
        if (removed === 0 && flag === 0) {
          result += 1;
        }
      }
    }
  });
  return result;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
