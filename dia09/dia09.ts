#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  let indiceArquivos = 0;
  let diskList: number[] = []

  input.split("").forEach((val, i) => {
    if (i % 2 === 0) {

      diskList = diskList.concat(Array(Number(val)).fill(indiceArquivos));
      indiceArquivos += 1;
    } else {
      diskList = diskList.concat(Array(Number(val)).fill(-1));
    }
  });
  
  let inicio = 0;
  let fim = diskList.length - 1
  while(true) {
    if (inicio >= fim) {
      break
    }

    if (diskList[inicio] !== -1) {
      inicio += 1
      continue;
    }
    if (diskList[fim] === -1) {
      fim -= 1;
      continue;
    }
    
    [diskList[inicio], diskList[fim]] = [diskList[fim], diskList[inicio]]
    fim -= 1
    inicio += 1
  }
  const resultado = diskList.reduce((acc, valor, i) => {
    if (valor === -1) return acc;
    acc += i * valor;
    return acc;
  }, 0);

  return resultado
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));
