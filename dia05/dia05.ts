#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

interface DicionarioRegras {
  [chave: number]: {
    anterior: number[];
    posterior: number[];
  };
}

function parsingRegras(rawRegras: string): DicionarioRegras {
  const regras: DicionarioRegras = {};

  rawRegras.split("\n").forEach((linha) => {
    const valores = linha.split("|");
    const anterior = Number(valores[0]);
    const posterior = Number(valores[1]);

    regras[anterior] = regras[anterior] ?? { anterior: [], posterior: [] };
    regras[posterior] = regras[posterior] ?? { anterior: [], posterior: [] };

    regras[posterior].anterior.push(anterior);
    regras[anterior].posterior.push(posterior);
  });

  return regras;
}

function parsingPaginas(rawPaginas: string): number[][] {
  const paginas: number[][] = [];
  rawPaginas.split("\n").forEach((linha) => {
    paginas.push(linha.split(",").map(Number));
  });
  return paginas;
}

function ordena(lista: number[], regras: DicionarioRegras): number[] {
  for (let i = 0; i < lista.length; i++) {
    const listaAnterior = lista.slice(0, i);
    const listaPosterior = lista.slice(i + 1);
    const regra = regras[lista[i]];

    for (const pagina of regra.anterior) {
      const idx = listaPosterior.findIndex((item) => item === pagina);

      if (idx !== -1) {
        lista = [
          ...listaAnterior,
          pagina,
          lista[i],
          ...listaPosterior.slice(0, idx),
          ...listaPosterior.slice(idx + 1),
        ];
        i = -1;
        break;
      }
    }
  }
  return lista;
}

function solver(input: string, part: number) {
  const [rawRegras, rawPaginas] = input.split("\n\n");

  const regras: DicionarioRegras = parsingRegras(rawRegras);
  const paginas: number[][] = parsingPaginas(rawPaginas);

  let result = 0;
  let result2 = 0;

  paginas.forEach((linha, indice) => {
    let flag = 0;
    for (let i = 0; i < linha.length; i++) {
      const listaAnterior = linha.slice(0, i);
      const listaPosterior = linha.slice(i + 1);
      const regra = regras[linha[i]];

      let ordemCorreta: boolean = !(listaAnterior.some((pagina) =>
        !regra.anterior.includes(pagina)
      ));
      if (!ordemCorreta) {
        flag = 1;
        break;
      }
      ordemCorreta = !(listaPosterior.some((pagina) =>
        !regra.posterior.includes(pagina)
      ));
      if (!ordemCorreta) {
        linha = ordena(linha, regras);
        flag = 1;
        break;
      }
    }
    const i = Math.floor(linha.length / 2);
    if (!flag) {
      result += linha[i];
    } else {
      result2 += linha[i];
    }
  });

  if (part === 1) {
    return result;
  } else {
    return result2;
  }
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log("parte 2:", solver(input, 2));
