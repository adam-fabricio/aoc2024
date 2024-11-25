#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env --allow-net

import "@std/dotenv/load";

async function pegaEntrada(
  dia: number = 1,
  ano: string = "2024",
): Promise<string> {
  const sessionCookie = Deno.env.get("SESSION_COOKIE");
  const url = `https://adventofcode.com/${ano}/day/${dia}/input`;
  const result = await fetch(url, {
    headers: {
      Cookie: `session=${sessionCookie}`,
    },
  });
  return result.text();
}

async function gravaArquivo(
  dia: number,
  tipo: string,
  conteudo: string,
): Promise<void> {
  const diretorio = dia < 10 ? `dia0${dia}` : `dia${dia}`;

  let arquivo: string = "";
  switch (tipo) {
    case "entrada":
      arquivo = "input.in";
      break;
    case "esqueleto":
      arquivo = `${diretorio}.ts`;
      break;
    case "test":
      arquivo = "test.in";
      break;
    default:
      break;
  }

  const caminhoArquivo = `${diretorio}\\${arquivo}`;
  console.log(caminhoArquivo);

  try {
    const dirInfo = await Deno.stat(diretorio);
    if (!dirInfo.isDirectory) {
      throw new Error(`${diretorio} existe mas não é um diretorio`);
    }
    1;
  } catch {
    console.log(`criando diretório ${diretorio}...`);
    await Deno.mkdir(diretorio, { recursive: true });
  }

  try {
    await Deno.stat(caminhoArquivo);
    console.log(
      `O arquivo ${caminhoArquivo} ja existe. Deseja substituir? (s/N):`,
    );
    const resposta = prompt();
    if (resposta?.toLowerCase() !== "s") {
      console.log("operacao cancelada.");
      return;
    }
  } catch {
    console.log(`Criando o arquivo ${caminhoArquivo}`);
  }
  try {
    const retorno = await Deno.writeTextFile(caminhoArquivo, conteudo);
    console.log(`Arquivo ${caminhoArquivo} gravado`);
    return retorno;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Erro ao salvar o arquivo ${caminhoArquivo}:`, e.message);
    }
  }
}

if (import.meta.main) {
  const argumentos = Deno.args;
  const dia = argumentos[0] ? Number(argumentos[0]) : 1;
  const ano = argumentos[1] ? argumentos[1] : "2024";
  const esqueleto = Deno.readTextFileSync("./day.ts");
  const arquivos = [
    ["entrada", await pegaEntrada(dia, ano)],
    ["esqueleto", esqueleto],
    ["test", ""],
  ];

  for (const arquivo of arquivos) {
    await gravaArquivo(dia, arquivo[0], arquivo[1]);
  }
}
