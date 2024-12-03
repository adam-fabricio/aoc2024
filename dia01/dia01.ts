#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  let resultado = 0;
  const lista1: number[] = [];
  const lista2: number[] = [];

  input.split("\n").forEach((linha) => {
    const [a, b] = linha.split("   ").map(Number);
    lista1.push(a);
    lista2.push(b);
  });

  for (let i = 0; i < lista1.length; i++) {
    resultado += Math.abs(lista1[i] - lista2[i]);
  }
  if (part === 1) {
    return resultado;
  }

  resultado = 0;
  lista1.forEach((numero) => {
    resultado += numero * lista2.reduce((acc, valor) => {
      return acc += valor === numero ? 1 : 0;
    }, 0);
  });

  if (part === 2) return resultado;
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
