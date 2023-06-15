import { IAlunoPresenter, IDisciplinaPresenter, IMatriculaPresenter } from "../presenter";


class ApplicationController { 
    cadastrarAluno(alunoDAO): IAlunoPresenter { 
        /**
         * Recebe sempre um DAO, objeto de dados
         * e retorna um presenter, que entrega os dados como necessário. 
         */
        return {} 
    }

    cadastrarDisciplina(disciplinaDAO): IDisciplinaPresenter { 
        /* ... */
        return {}
    }

    matricularAluno(alunoId, disciplinaId): IMatriculaPresenter { 
        /* ... */
        return {}
    }
}