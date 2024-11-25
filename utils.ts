export interface ParseDict {
  [chave: string]: {
    [field: string]: number;
  }
}

/**
 * Função para analisar uma string de entrada e transformalá em um objeto
 * aninhado.
 *
 * @param input - String do arquivo lido
 * @param campoIndices - Array de indices para campos chave
 * @param valorIndices - Array de indices para os valores
 * @param campoChave? - caso seja fornecido esse campos será a chave
 * @returns um objeto onde as chaves é os valores são outro objecto contendo
 *          pares campo valor
 */

export function parsingDict(
  input: string,
  campoIndices: number[],
  valorIndices: number[],
  campoChave?: number,
): ParseDict {

  const objeto: ParseDict = {};
  input.split("\n").forEach((linha) => {
    const campo = linha.split(" ");
    // A chave do objeto é o primeiro campo.
    const chave = campoChave ? campo[campoChave] : campo[0];
    objeto[chave] = {};

    campoIndices.forEach((campoIndice, indice) => {
      const valorIndice = valorIndices[indice];
      const valor = parseInt(campo[valorIndice]);
      objeto[chave][campo[campoIndice]] = valor;
    });
  });
  return objeto;
}

/**
 * Função para ler um arquivo relativo a url e retorna o conteudo do arquivo
 * 
 * @param nome - Nome do arquivo "test.txt ou input.txt"
 * @param baseUrl - O caminho da pasta onde estará o arquivo
 * @returns O conteúdo do arquivo como uma string.
 *
 */

export function leArquivo(nome: string, baseUrl: string): string {
  const filePath = new URL(nome, baseUrl);
  return Deno.readTextFileSync(filePath).trim();
}
