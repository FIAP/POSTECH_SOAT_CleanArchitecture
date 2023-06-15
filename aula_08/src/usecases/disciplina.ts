import { Disciplina } from "@entities/disciplina";
import { DbConnection } from "@interfaces/dbconnection";
import { DisciplinaGatewayInterface } from "@interfaces/gateways";
import { DisciplinaGateway } from "src/gateways";

export class DisciplinaUseCases {
  static async ObterTodasDisciplinas(
    disciplinasGateway: DisciplinaGatewayInterface
  ): Promise<Disciplina[] | null> {
    const todasAsDisciplinas = await disciplinasGateway.BuscarTodas();
    return todasAsDisciplinas;
  }

  static async IncluirDisciplina(
    nome: string,
    disciplinasGateway: DisciplinaGatewayInterface
  ) {
    const disciplina = await disciplinasGateway.BuscarPorNome(nome);

    if (disciplina !== null) return Promise.reject("Disciplina já existente");

    const novaDisciplina = new Disciplina(-1, nome);
    disciplinasGateway.Incluir(novaDisciplina);
    return true;
  }
}
