#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";

function solver(input: string, part: number) {
  console.log(input);
}

const entrada = "test.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
// console.log('parte 2:', solver(input, 2));