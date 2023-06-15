import { Disciplina } from "./disciplina";
import { Estudante } from "./estudante";

export class Matricula { 
    private _estudante: Estudante;
    private _disciplina: Disciplina;

    constructor(estudante: Estudante, disciplina: Disciplina) {
        if (estudante == null) {
            throw new Error('Estudante invalido');
        }
        if (disciplina == null) {
            throw new Error('Disciplina invalida');
        }
        
        this._estudante = estudante;
        this._disciplina = disciplina;
    }

    get estudante(): Estudante {
        return this._estudante;
    }

    get disciplina(): Disciplina {
        return this._disciplina;
    }
}