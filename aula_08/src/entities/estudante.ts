/**
 * Estudante com id = -1 é um novo estudante.
 */

export class Estudante {
  private _nome: string;
  private _id: number;

  constructor(id: number, nome: string) {
    this._id = id;     
    this._nome = nome;
  }

  get nome(): string {
    return this._nome;
  }

  get id(): number {
    return this._id;
  }

  get isValid(): boolean { 
    return this._id > 0;
  }
}