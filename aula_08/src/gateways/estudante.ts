import { Estudante } from "@entities";
import { DbConnection } from "@interfaces/dbconnection";
import { EstudanteGatewayInterface } from "@interfaces/gateways";
import { ParametroBd } from "@types";

export class EstudanteGateway implements EstudanteGatewayInterface {
  private repositorioDados: DbConnection;
  private nomeTabela = "estudantes";

  constructor(database: DbConnection) {
    this.repositorioDados = database;
  }

  async BuscarPorId(id: number): Promise<Estudante | null> {
    const retornoBd = await this.repositorioDados.BuscarPorParametros(
      this.nomeTabela,
      null,
      [{ campo: "estudante_id", valor: id }]
    );

    if (retornoBd === null || retornoBd === undefined) return null;
    if (retornoBd.length < 1) return null;

    const linhaRetorno = retornoBd[0];
    return new Estudante(linhaRetorno.estudante_id, linhaRetorno.nome);
  }

  async BuscarPorNome(nome: string): Promise<Estudante | null> {
    const retornoBD = await this.repositorioDados.BuscarPorParametros(
      this.nomeTabela,
      null,
      [{ campo: "nome", valor: nome }]
    );

    if (retornoBD === null || retornoBD === undefined) {
      return null;
    }

    if (retornoBD.length < 1) {
      return null;
    }

    const linhaRetorno = retornoBD[0];
    const estudante = new Estudante(
      linhaRetorno.estudante_id,
      linhaRetorno.nome
    );

    return estudante;
  }

  async BuscarTodos(): Promise<Estudante[] | null> {
    const result = await this.repositorioDados.BuscarTodas(
      this.nomeTabela,
      null
    );

    if (result === null) {
      return null;
    } else {
      const returnData: Estudante[] = [];
      result.forEach((element: any) => {
        returnData.push(new Estudante(element.estudante_id, element.nome));
      });
      return returnData;
    }
  }

  async Incluir(estudante: Estudante): Promise<void> {
    const novoId = await this.repositorioDados.ObterUltimoId(this.nomeTabela);

    const parametros: ParametroBd[] = [];
    parametros.push({ campo: "estudante_id", valor: novoId });
    parametros.push({ campo: "nome", valor: estudante.nome });

    const sucesso = await this.repositorioDados.Inserir(
      this.nomeTabela,
      parametros
    );
  }
}
