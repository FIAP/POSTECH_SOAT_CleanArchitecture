import { Disciplina, Estudante, Matricula } from "@entities";
import { MatriculaDados } from "@types";
import {
  DisciplinaGatewayInterface,
  EstudanteGatewayInterface,
  MatriculaGatewayInterface,
} from "@interfaces/gateways";
import {
  MatriculaGateway,
  EstudanteGateway,
  DisciplinaGateway,
} from "src/gateways";

export class MatriculaUseCases {
  static async ObterEstudantesPorDisciplina(
    disciplinaId: number,
    matriculaGateway: MatriculaGatewayInterface,
    estudanteGateway: EstudanteGatewayInterface,
    disciplinaGateway: DisciplinaGatewayInterface
  ) {
    const disciplina = await disciplinaGateway.BuscarPorId(disciplinaId);
    if (disciplina === null) return Promise.reject("Disciplina nao encontrada");

    const matriculasDisciplina: MatriculaDados[] =
      await matriculaGateway.BuscarPorDisciplina(disciplina);

    if (matriculasDisciplina === null || matriculasDisciplina === undefined)
      return [];

    const estudantesDisciplina: Estudante[] = [];
    for (let i = 0; i < matriculasDisciplina.length; i++) {
      const estudante = await estudanteGateway.BuscarPorId(
        matriculasDisciplina[i].estudanteId
      );
      if (estudante !== null) estudantesDisciplina.push(estudante);
    }
    return estudantesDisciplina;
  }
  static async ObterDisciplinasPorEstudante(
    estudanteId: number,
    matriculaGateway: MatriculaGatewayInterface,
    estudanteGateway: EstudanteGatewayInterface,
    disciplinaGateway: DisciplinaGatewayInterface
  ): Promise<Disciplina[]> {
    const estudante = await estudanteGateway.BuscarPorId(estudanteId);
    if (estudante === null) return Promise.reject("Estudante nao encontrado");

    const matriculasEstudante: MatriculaDados[] =
      await matriculaGateway.BuscarPorEstudante(estudante);

    if (matriculasEstudante === null || matriculasEstudante === undefined)
      return [];

    const disciplinasEstudante: Disciplina[] = [];
    for (let i = 0; i < matriculasEstudante.length; i++) {
      const disciplina = await disciplinaGateway.BuscarPorId(
        matriculasEstudante[i].disciplinaId
      );
      if (disciplina !== null) disciplinasEstudante.push(disciplina);
    }

    return disciplinasEstudante;
  }

  static async MatricularEstudanteEmDisciplina(
    estudanteId: number,
    disciplinaId: number,
    matriculaGateway: MatriculaGatewayInterface,
    estudanteGateway: EstudanteGatewayInterface,
    disciplinaGateway: DisciplinaGatewayInterface
  ): Promise<Matricula> {
    // estudante existe?
    const estudante = await estudanteGateway.BuscarPorId(estudanteId);
    if (estudante === null) return Promise.reject("Estudante nao encontrado");

    // disciplina existe?
    const disciplina = await disciplinaGateway.BuscarPorId(disciplinaId);
    if (disciplina === null) return Promise.reject("Disciplina nao encontrada");

    // ja existe estudante essa disciplina?
    const matriculaExistente = await matriculaGateway.Buscar(
      estudante,
      disciplina
    );
    if (matriculaExistente !== null)
      return Promise.reject("Matrícula ja efetuada");

    // como tudo está correto, podemos dar andamento!
    const matriculaNova = new Matricula(estudante, disciplina);
    return matriculaNova;
  }
}
