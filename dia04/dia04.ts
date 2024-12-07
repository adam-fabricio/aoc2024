#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number): number {
  let result = 0;
  let resultDois = 0;
  let m = 0;
  let a = 0;
  let s = 0;
  let lM = [];
  let lA = [];
  let lS = [];
  const linhas = input.split("\n");
  for (let l = 0; l < linhas.length; l++) {
    linhas[l].split("").forEach((char, c, linha) => {
      if (char !== "X") {
        if (char === "A") {
          if (
            c - 1 < 0 || l - 1 < 0 || l + 1 >= linhas.length ||
            c + 1 >= linha.length
          ) {
            return;
          }

          if (
            (linhas[l - 1][c - 1] === "M" && linhas[l + 1][c + 1] === "S") ||
            (linhas[l - 1][c - 1] === "S" && linhas[l + 1][c + 1] === "M")
          ) {
            if (
              (linhas[l - 1][c + 1] === "M" && linhas[l + 1][c - 1] === "S") ||
              (linhas[l - 1][c + 1] === "S" && linhas[l + 1][c - 1] === "M")
            ) {
              resultDois += 1;
            }
          }
        }
        return;
      }
      // <-
      m = c - 1;
      a = c - 2;
      s = c - 3;
      if (linha[m] + linha[a] + linha[s] === "MAS") {
        result += 1;
      }
      // ->
      m = c + 1;
      a = c + 2;
      s = c + 3;
      if (linha[m] + linha[a] + linha[s] === "MAS") {
        result += 1;
      }
      // ^
      m = l - 1;
      a = l - 2;
      s = l - 3;
      if (
        (linhas[m]?.[c] ?? "") + (linhas[a]?.[c] ?? "") +
            (linhas[s]?.[c] ?? "") === "MAS"
      ) {
        result += 1;
      }
      // v
      m = l + 1;
      a = l + 2;
      s = l + 3;
      if (linhas[m]?.[c] + linhas[a]?.[c] + linhas[s]?.[c] === "MAS") {
        result += 1;
      }
      // ^<-
      lM = [l - 1, c - 1];
      lA = [l - 2, c - 2];
      lS = [l - 3, c - 3];
      if (
        linhas[lM[0]]?.[lM[1]] + linhas[lA[0]]?.[lA[1]] +
            linhas[lS[0]]?.[lS[1]] === "MAS"
      ) {
        result += 1;
      }
      // v<-
      lM = [l + 1, c - 1];
      lA = [l + 2, c - 2];
      lS = [l + 3, c - 3];
      if (
        linhas[lM[0]]?.[lM[1]] + linhas[lA[0]]?.[lA[1]] +
            linhas[lS[0]]?.[lS[1]] === "MAS"
      ) {
        result += 1;
      }
      // ^->
      lM = [l - 1, c + 1];
      lA = [l - 2, c + 2];
      lS = [l - 3, c + 3];
      if (
        linhas[lM[0]]?.[lM[1]] + linhas[lA[0]]?.[lA[1]] +
            linhas[lS[0]]?.[lS[1]] === "MAS"
      ) {
        result += 1;
      }
      lM = [l + 1, c + 1];
      lA = [l + 2, c + 2];
      lS = [l + 3, c + 3];
      if (
        linhas[lM[0]]?.[lM[1]] + linhas[lA[0]]?.[lA[1]] +
            linhas[lS[0]]?.[lS[1]] === "MAS"
      ) {
        result += 1;
      }
    });
  }
  if (part === 1) {
    return result;
  } else {
    return resultDois;
  }
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
