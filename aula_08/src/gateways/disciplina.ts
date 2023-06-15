import { Disciplina } from "@entities/disciplina";
import { DbConnection } from "@interfaces/dbconnection";
import { DisciplinaGatewayInterface } from "@interfaces/gateways";
import { ParametroBd } from "@types";

export class DisciplinaGateway implements DisciplinaGatewayInterface {
  private repositorioDados: DbConnection;
  private nomeTabela = "disciplinas";

  constructor(conexao: DbConnection) {
    this.repositorioDados = conexao;
  }

  public async BuscarPorId(id: number): Promise<Disciplina | null> {
    const retornoBd = await this.repositorioDados.BuscarPorParametros(
      this.nomeTabela,
      null,
      [{ campo: "disciplina_id", valor: id }]
    );
    if (retornoBd === null || retornoBd === undefined) return null;
    if (retornoBd.length < 1) return null;

    const row = retornoBd[0];
    return new Disciplina(row.disciplina_id, row.nome);
  }

  public async BuscarPorNome(nome: string): Promise<Disciplina | null> {
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
    const disciplina = new Disciplina(
      linhaRetorno.disciplina_id,
      linhaRetorno.nome
    );

    return disciplina;
  }

  public async BuscarTodas(): Promise<Disciplina[] | null> {
    const result = await this.repositorioDados.BuscarTodas(
      this.nomeTabela,
      null
    );

    if (result === null) {
      return null;
    } else {
      const returnData: Disciplina[] = [];
      result.forEach((element: any) => {
        returnData.push(new Disciplina(element.disciplina_id, element.nome));
      });
      return returnData;
    }
  }

  public async Incluir(disciplina: Disciplina): Promise<void> {
    const novoId = await this.repositorioDados.ObterUltimoId(this.nomeTabela);

    const parametros: ParametroBd[] = [];
    parametros.push({ campo: "disciplina_id", valor: novoId });
    parametros.push({ campo: "nome", valor: disciplina.nome });

    const sucesso = await this.repositorioDados.Inserir(
      this.nomeTabela,
      parametros
    );
  }
}
