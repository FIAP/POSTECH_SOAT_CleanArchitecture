class Produto {
    nome: string;

    private _preco: number;
    private _desconto: number = 1;

    constructor(nome: string, preco: number) {
        this.nome = nome;
        this._preco = preco;
    }

    setDesconto(porcentagem: number) {
        this._desconto = 1 - porcentagem/100;
    }

    get preco(): number {   // aqui estamos encapsulando o calculo do preço como propriedade
        return this._preco * this._desconto;
    }
}

export {Produto}