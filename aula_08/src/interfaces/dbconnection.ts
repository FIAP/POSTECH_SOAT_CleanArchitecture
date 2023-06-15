import { ParametroBd } from "@types";

export interface DbConnection {
  BuscarPorParametros(
    nomeTabela: string,
    campos: string[] | null,
    parametros: ParametroBd[]
  ): Promise<any>;

  BuscarTodas(nomeTabela: string, campos?: string[] | null): Promise<any[]>;

  Inserir(nomeTabela: string, parametros: ParametroBd[]): Promise<void>;

  ObterUltimoId(nomeTabela: string): Promise<number>;
}
