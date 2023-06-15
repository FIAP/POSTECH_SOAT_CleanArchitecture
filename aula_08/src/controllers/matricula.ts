import { Disciplina, Estudante } from "@entities";
import {
  DisciplinaGateway,
  EstudanteGateway,
  MatriculaGateway,
} from "@gateways/matricula";
import { DbConnection } from "@interfaces/dbconnection";
import { MatriculaUseCases } from "@usecases";
import { DisciplinaAdapter, EstudanteAdapter } from "@adapters";

export class MatriculaController {
  static async ObterDisciplinasPorEstudante(
    estudanteId: number,
    dbconnection: DbConnection
  ): Promise<string> {
    const matriculaGateway = new MatriculaGateway(dbconnection);
    const estudanteGateway = new EstudanteGateway(dbconnection);
    const disciplinaGateway = new DisciplinaGateway(dbconnection);
    const disciplinas = await MatriculaUseCases.ObterDisciplinasPorEstudante(
      estudanteId,
      matriculaGateway,
      estudanteGateway,
      disciplinaGateway
    );

    return DisciplinaAdapter.adaptJsonDisciplinas(disciplinas);
  }

  static async ObterEstudantesPorDisciplina(
    disciplinaId: number,
    dbconnection: DbConnection
  ): Promise<string> {
    const matriculaGateway = new MatriculaGateway(dbconnection);
    const estudanteGateway = new EstudanteGateway(dbconnection);
    const disciplinaGateway = new DisciplinaGateway(dbconnection);
    const estudantes = await MatriculaUseCases.ObterEstudantesPorDisciplina(
      disciplinaId,
      matriculaGateway,
      estudanteGateway,
      disciplinaGateway
    );

    return EstudanteAdapter.adaptJsonEstudantes(estudantes);
  }

  static async MatricularEstudanteEmDisciplina(
    estudanteId: number,
    disciplinaId: number,
    dbconnection: DbConnection
  ): Promise<void> {
    const matriculaGateway = new MatriculaGateway(dbconnection);
    const estudanteGateway = new EstudanteGateway(dbconnection);
    const disciplinaGateway = new DisciplinaGateway(dbconnection);

    const matricula = await MatriculaUseCases.MatricularEstudanteEmDisciplina(
      estudanteId,
      disciplinaId,
      matriculaGateway,
      estudanteGateway,
      disciplinaGateway
    );

    if (matricula !== null && matricula !== undefined) {
      // gravar no banco de dados!
      await matriculaGateway.Incluir(matricula);
    }

    // se chegou aqui, deu tudo certo.
  }
}
