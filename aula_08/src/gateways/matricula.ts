import { Estudante, Matricula, Disciplina } from "@entities";
import { DbConnection } from "@interfaces/dbconnection";
import { MatriculaGatewayInterface } from "@interfaces/gateways";
import { ParametroBd } from "@types";
import { MatriculaDados } from "@types";

class MatriculaGateway implements MatriculaGatewayInterface {
  private connection: DbConnection;
  private nomeTabela = "matriculas";

  constructor(database: DbConnection) {
    this.connection = database;
  }
  public async Buscar(
    estudante: Estudante,
    disciplina: Disciplina
  ): Promise<Matricula | null> {
    const resultado = await this.connection.BuscarPorParametros(
      this.nomeTabela,
      null,
      [
        { campo: "disciplina_id", valor: disciplina.id },
        { campo: "estudante_id", valor: estudante.id },
      ]
    );

    if (resultado === null || resultado === undefined) return null;
    if (resultado.length < 1) return null;

    return new Matricula(estudante, disciplina);
  }

  public async Incluir(matricula: Matricula): Promise<void> {
    const parametros: ParametroBd[] = [];
    parametros.push({ campo: "disciplina_id", valor: matricula.disciplina.id });
    parametros.push({ campo: "estudante_id", valor: matricula.estudante.id });

    await this.connection.Inserir(this.nomeTabela, parametros);
  }

  public async BuscarPorEstudante(
    estudante: Estudante
  ): Promise<MatriculaDados[]> {
    const parametros: ParametroBd[] = [
      { campo: "estudante_id", valor: estudante.id },
    ];
    const listaMatriculasBd = await this.connection.BuscarPorParametros(
      this.nomeTabela,
      null,
      parametros
    );
    if (listaMatriculasBd.length < 1) return [];

    const listaMatriculas: MatriculaDados[] = [];
    for (let p = 0; p < listaMatriculasBd.length; p++) {
      listaMatriculas.push({
        estudanteId: estudante.id,
        disciplinaId: listaMatriculasBd[p].disciplina_id,
      });
    }

    return listaMatriculas;
  }

  public async BuscarPorDisciplina(
    disciplina: Disciplina
  ): Promise<MatriculaDados[]> {
    const parametros: ParametroBd[] = [
      { campo: "disciplina_id", valor: disciplina.id },
    ];
    const listaMatriculasBd = await this.connection.BuscarPorParametros(
      this.nomeTabela,
      null,
      parametros
    );
    if (listaMatriculasBd.length < 1) return [];

    const listaMatriculas: MatriculaDados[] = [];
    for (let p = 0; p < listaMatriculasBd.length; p++) {
      listaMatriculas.push({
        estudanteId: listaMatriculasBd[p].estudante_id,
        disciplinaId: disciplina.id,
      });
    }

    return listaMatriculas;
  }
}

export { MatriculaDados, MatriculaGateway };
