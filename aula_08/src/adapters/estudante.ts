import { Estudante } from "@entities";

interface EstudanteOut {
  nome: string;
  id: string;
}

export const EstudanteAdapter = {
  adaptJsonEstudantes: function (dados: Estudante[] | null): string {
    if (dados === null) {
      return JSON.stringify({});
    }
    let alldata = dados.map(function (item) {
      return { nome: item.nome, id: item.id };
    });
    return JSON.stringify(alldata);
  },
};
