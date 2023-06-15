import { EstudanteGateway } from "@gateways/estudante";
import { DbConnection } from "@interfaces/dbconnection";
import { EstudanteUseCases } from "@usecases";
import { EstudanteAdapter } from "@adapters";

export class EstudanteController {
  static async ObterTodosEstudantes(
    dbconnection: DbConnection
  ): Promise<string> {
    const estudantesGateway = new EstudanteGateway(dbconnection);
    const todosOsEstudantes = await EstudanteUseCases.ObterTodosEstudantes(
      estudantesGateway
    );

    const adapted = EstudanteAdapter.adaptJsonEstudantes(todosOsEstudantes);
    return adapted;
  }

  static async IncluirEstudante(
    nome: string,
    dbconnection: DbConnection
  ): Promise<void> {
    const estudanteGateway = new EstudanteGateway(dbconnection);
    const estudante = await EstudanteUseCases.IncluirEstudante(
      nome,
      estudanteGateway
    ).catch((err) => {
      return Promise.reject(err);
    });
  }
}
