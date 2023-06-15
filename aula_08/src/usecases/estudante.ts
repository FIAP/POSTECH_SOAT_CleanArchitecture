import { Estudante } from "@entities/estudante";
import { EstudanteGatewayInterface } from "@interfaces/gateways";

class EstudanteUseCases {
  static async ObterTodosEstudantes(
    estudantesGateway: EstudanteGatewayInterface
  ): Promise<Estudante[] | null> {
    const todosOsEstudantes = await estudantesGateway.BuscarTodos();
    return todosOsEstudantes;
  }

  static async IncluirEstudante(
    nome: string,
    estudanteGateway: EstudanteGatewayInterface
  ): Promise<boolean> {
    // aqui eh o usecase. eu tenho que verificar se o estudante ja existe.
    const estudante = await estudanteGateway.BuscarPorNome(nome);

    if (estudante !== null) return Promise.reject("Estudante ja existente");

    const novoEstudante = new Estudante(-1, nome);
    const resultadoInclusao = await estudanteGateway.Incluir(novoEstudante);
    return true;
  }
}

export { EstudanteUseCases };
