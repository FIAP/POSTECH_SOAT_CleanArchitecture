import { DbConnection } from "@interfaces/dbconnection";
import { ParametroBd } from "@types";
import { open } from "sqlite";

const sqlite3 = require("sqlite3").verbose();

interface parametros {
  restricao: string;
  valores: any[];
}

export class SqliteConnection implements DbConnection {
  private _dsn: string;

  constructor(dsn: string) {
    this._dsn = dsn;
  }

  private async openDatabase() {
    return await open({ filename: this._dsn, driver: sqlite3.Database });
  }

  async BuscarTodas(
    nomeTabela: string,
    campos?: string[] | null
  ): Promise<any[]> {
    // tratar os campos
    const camposBusca = this.ajustarCamposExpressao(campos);

    // construir o comando sql
    const sql = `SELECT ${camposBusca} FROM ${nomeTabela} `;
    const connection = await this.openDatabase();
    const rows = await connection.all(sql, []);
    connection.close();
    return rows;
  }

  async BuscarPorParametros(
    nomeTabela: string,
    campos: string[] | null,
    parametros: ParametroBd[]
  ): Promise<any> {
    const camposBusca = this.ajustarCamposExpressao(campos);
    const parametrosBusca = this.prepararParametrosBusca(parametros);
    const sql = `
      SELECT ${camposBusca} 
      FROM ${nomeTabela}
      ${parametrosBusca.restricao}
    `;

    const connection = await this.openDatabase();
    const rows = await connection.all(sql, parametrosBusca.valores);
    connection.close();
    return rows;
  }

  async ObterUltimoId(nomeTabela: string): Promise<number> {
    const sql = `SELECT seq FROM sqlite_sequence WHERE name=$t`;
    const params = { $t: nomeTabela };
    const db = await this.openDatabase();
    const result = await db.get(sql, params);

    if (result === null || result === undefined) {
      return 1;
    }

    return result.seq + 1;
  }

  async Inserir(nomeTabela: string, parametros: ParametroBd[]): Promise<void> {
    const nomesCampos: string[] = [];
    const nomesValores: string[] = [];
    const valores: Record<string, any> = {};

    parametros.forEach(function (item) {
      nomesCampos.push(item.campo);
      const nomeValor = `$${item.campo}`;
      nomesValores.push(nomeValor);
      valores[nomeValor] = item.valor;
    });

    const sql = `
      INSERT INTO ${nomeTabela} 
      (${nomesCampos.join(",")}) 
      VALUES 
      (${nomesValores.join(",")})
    `;

    const bancoDados = await this.openDatabase();
    const prepared = await bancoDados.prepare(sql, valores);
    prepared.run();
  }

  // auxiliares

  private prepararParametrosBusca(
    params: ParametroBd[] | null | undefined
  ): parametros {
    if (params === null || params === undefined) {
      return {
        restricao: "",
        valores: [],
      };
    }

    const camposRestricao: string[] = [];
    const valores: any[] = [];
    params.forEach(function (item) {
      camposRestricao.push(`${item.campo} = ?`);
      valores.push(item.valor);
    });

    return {
      restricao: `WHERE ${camposRestricao.join(" AND ")}`,
      valores: valores,
    };
  }

  private ajustarCamposExpressao(campos: string[] | undefined | null): string {
    if (campos === undefined || campos === null) {
      return " * ";
    } else if (campos.length == 0) {
      return " * ";
    } else {
      return campos.join(", ");
    }
  }
}
