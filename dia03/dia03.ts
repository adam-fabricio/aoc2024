#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function calculaMult(input: string): number {
  if (!input) {
    return 0;
  }
  const regex = /mul\(\d+,\d+\)/g;
  const comandos = input.match(regex) || [];
  return comandos.reduce((acc, comando) => {
    const numeros = comando.match(/\d+/g);
    if (numeros) {
      const [a, b] = numeros.map(Number);
      return acc + a * b;
    }
    return acc;
  }, 0);
}

function solver(input: string, part: number) {
  const regex = /mul\(\d+,\d+\)/g;
  const comandos = input.match(regex) || [];
  if (part === 1) {
    return comandos.reduce((acc, comando) => {
      const numeros = comando.match(/\d+/g);
      if (numeros) {
        const [a, b] = numeros.map(Number);
        return acc + a * b;
      }
      return acc;
    }, 0);
  }
  let result = 0;
  const novoComandos = input.split("don't()");
  for (let i = 0; i < novoComandos.length; i++) {
    if (i === 0) {
      result += calculaMult(novoComandos[i]);
      continue;
    }
    const comandosValidos = novoComandos[i].split("do()");
    for (let j = 1; j < comandosValidos.length; j++) {
      result += calculaMult(comandosValidos[j]);
    }
  }
  return result;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
