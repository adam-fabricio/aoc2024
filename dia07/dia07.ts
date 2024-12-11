#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";


function geraResultados(listaValores: number[], part: number): number[] {
  const valor = listaValores.pop() ?? 0;
  if (listaValores.length === 0) {
    return [valor];
  }
  const valores = geraResultados(listaValores, part)
  const resultados: number[] = []
  valores.forEach((val) => {
    resultados.push(val + valor);
    resultados.push(val * valor);
    if (part === 2) {
      resultados.push(Number(val.toString() + valor.toString()))
    }
  });
  return resultados;
}

function solver(input: string, part: number) {
  
  let result = 0

  input.split("\n").forEach((linha) => {
    const [rawResultado, valores] = linha.split(":");
    const listaValores = valores.trim().split(" ").map(Number);
    const resultados = geraResultados(listaValores, part);
    const resultado = Number(rawResultado);

    if (resultados.includes(resultado)) {
      result += resultado
    }
  });

  return result

}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log('parte 2:', solver(input, 2));
