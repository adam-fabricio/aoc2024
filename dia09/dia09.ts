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

    console.log(disk)
    
    for ( let i = disk.length - 1; i > 0; i--) {
      console.log("***", i, disk[i])
      if (disk[i].id === -1) {
        continue
      }
      console.log("--->", i, disk[i])
      let j = 0
      
      while (i >= j) {
        if (disk[j].id === -1 && disk[j].len >= disk[i].len) {
          console.log("J", disk[j])
          console.log("I", disk[i])
          const fileBlock: DiskStructure = {initialBlock: disk[j].initialBlock, len: disk[i].len, id: disk[i].id};
          if (disk[i].len !== disk[j].len) {
            const emptyBlock: DiskStructure = {initialBlock: disk[j].initialBlock + disk[i].len, len: disk[j].len - disk[i].len, id: -1};
            disk = [...disk.slice(0,j), fileBlock, emptyBlock, ...disk.slice(j + 1, i), ...disk.slice(i + 1)]
            i += 1
          } else {
            disk = [...disk.slice(0,j), fileBlock, ...disk.slice(j+1, i), ...disk.slice(i +1)]
          }
          console.log(disk.length, disk)
          break
        }
        j++
      }
    }


    return 2;
  }
}

const entrada = "test.in";
const input: string = leArquivo(entrada, import.meta.url);

//console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
