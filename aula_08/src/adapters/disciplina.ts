import { Disciplina } from "@entities/disciplina";

interface DisciplinaOut {
  nome: string;
  id: string;
}

export const DisciplinaAdapter = {
  adaptJsonDisciplinas: function (dados: Disciplina[] | null): string {
    if (dados === null) {
      return JSON.stringify({});
    }
    let alldata = dados.map(function (item) {
      return { nome: item.nome, id: item.id };
    });
    return JSON.stringify(alldata);
  },
};
