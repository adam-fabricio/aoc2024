#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  let indiceArquivos = 0;
  let diskList: number[] = [];
  if (part === 1) {
    input.split("").forEach((val, i) => {
      if (i % 2 === 0) {
        diskList = diskList.concat(Array(Number(val)).fill(indiceArquivos));
        indiceArquivos += 1;
      } else {
        diskList = diskList.concat(Array(Number(val)).fill(-1));
      }
    });

    let inicio = 0;
    let fim = diskList.length - 1;
    while (true) {
      if (inicio >= fim) {
        break;
      }

      if (diskList[inicio] !== -1) {
        inicio += 1;
        continue;
      }
      if (diskList[fim] === -1) {
        fim -= 1;
        continue;
      }

      [diskList[inicio], diskList[fim]] = [diskList[fim], diskList[inicio]];
      fim -= 1;
      inicio += 1;
    }
    const resultado = diskList.reduce((acc, valor, i) => {
      if (valor === -1) return acc;
      acc += i * valor;
      return acc;
    }, 0);

    return resultado;
  } else {
    interface DiskStructure {
      initialBlock: number;
      len: number;
      id: number;
    }

    let disk: DiskStructure[]  = [];
    let currentBlock = 0
    
    input.split("").forEach((val, i) => {
      const len = Number(val)
      disk.push({initialBlock: currentBlock, len: len,  id: i % 2 === 0 ? Math.floor(i / 2) : -1});
      currentBlock += len
    });

    
    for ( let i = disk.length - 1; i > 0; i--) {
      if (disk[i].id === -1) {
        continue
      }
      let j = 0
      
      while (i >= j) {
        if (disk[j].id === -1 && disk[j].len >= disk[i].len) {
          const fileBlock: DiskStructure = {initialBlock: disk[j].initialBlock, len: disk[i].len, id: disk[i].id};
          if (disk[i].len !== disk[j].len) {
            const emptyBlock: DiskStructure = {initialBlock: disk[j].initialBlock + disk[i].len, len: disk[j].len - disk[i].len, id: -1};
            disk = [...disk.slice(0,j), fileBlock, emptyBlock, ...disk.slice(j + 1, i), ...disk.slice(i + 1)]
            i += 1
          } else {
            disk = [...disk.slice(0,j), fileBlock, ...disk.slice(j+1, i), ...disk.slice(i +1)]
          }
          break
        }
        j++
      }
    }

    return disk.reduce((acc, block) => {
      if (block.id === -1) return acc;

      for (let i = block.initialBlock; i < block.initialBlock + block.len; i++) {
        acc += block.id * i
      }
      return acc;
    }, 0);
  }
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
