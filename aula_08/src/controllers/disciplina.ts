import { DisciplinaGateway } from "@gateways/disciplina";
import { EstudanteGateway } from "@gateways/disciplina";
import { DbConnection } from "@interfaces/dbconnection";
import { DisciplinaUseCases } from "@usecases";
import { DisciplinaAdapter } from "../adapters/disciplina";

export class DisciplinaController {
  static async ObterTodasDisciplinas(
    dbconnection: DbConnection
  ): Promise<string> {
    const disciplinaGateway = new DisciplinaGateway(dbconnection);
    const todasAsDisciplinas = await DisciplinaUseCases.ObterTodasDisciplinas(
      disciplinaGateway
    ); // vai retornar Disciplina[]

    const adapted = DisciplinaAdapter.adaptJsonDisciplinas(todasAsDisciplinas);
    return adapted;
  }

  static async IncluirDisciplina(
    nome: string,
    dbconnection: DbConnection
  ): Promise<void> {
    const disciplinaGateway = new DisciplinaGateway(dbconnection);
    const disciplina = await DisciplinaUseCases.IncluirDisciplina(
      nome,
      disciplinaGateway
    ).catch((err) => {
      return Promise.reject(err);
    });
  }

  static async MatricularEstudante(
    disciplinaId: number,
    estudanteId: number,
    dbconnection: DbConnection
  ) {}
}
