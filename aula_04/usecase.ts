class EstudanteUseCases {
  public static registrarEstudante(p: Pessoa, estudanteRepositorio: EstudanteRepositorio) {
    if (EstudanteUseCases.verificarPessoaEstudante(p, estudanteRepositorio) !== null) {
      throw new Error("Pessoa ja é estudante.")
    }
    return new Estudante(p.nome, p.identificacao, 'nova_matricula');
  }

  public static verificarPessoaEstudante(p: Pessoa, estudanteRepositorio: EstudanteRepositorio) {
    return estudanteRepositorio.buscarPorPessoa(p.identificacao);
  }
}