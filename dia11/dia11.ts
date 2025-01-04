#!/usr/bin/env -S deno run --allow-read --allow-write

import { leArquivo, parseDict, parsingDict } from "../utils.ts";


function blink(beforeBlink: Map<string, number>): Map<string, number> {
  const afterBlink: Map<string, number> = new Map();
  beforeBlink.forEach((amount, value) => {
    if (value === "0") {
      afterBlink.set("1", (afterBlink.get("1") ?? 0) + amount);
    } else if (value.length % 2 === 0) {
      const half = value.length / 2;
      const firstStone = Number(value.slice(0, half)).toString();
      const lastStone = Number(value.slice(half)).toString();
      afterBlink.set(firstStone, (afterBlink.get(firstStone) ?? 0) + amount);
      afterBlink.set(lastStone, (afterBlink.get(lastStone) ?? 0) + amount);
    } else {
      const newValue = Number(value) * 2024;
      const stringValue = newValue.toString();
      afterBlink.set(stringValue, (afterBlink.get(stringValue) ?? 0) + amount);
    }
  });
  return afterBlink;
}


function solver(input: string, part: number) {
  console.log(input);
  let stones: Map<string, number> = new Map(
    input.split(" ").map((val) => {
      return [val, 1];
    }),
  );
  const blinks = part === 1 ? 25 : 75
  for (let i = 0; i < blinks; i++) {
    stones = blink(stones)
  }
  
  return stones.values().reduce((acc, value) => acc + value, 0);
}

const entrada = "input.in";
const input: string = leArquivo(entrada, import.meta.url);

console.log("parte 1:", solver(input, 1));
console.log('parte 2:', solver(input, 2));
