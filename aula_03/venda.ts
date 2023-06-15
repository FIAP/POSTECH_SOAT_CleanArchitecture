import { Produto } from "./produto";
import { Vendedor } from "./vendedor";

const MAX_PRODUTOS = 10;

class Venda {
    data: Date;
    itens: Produto[];
    vendedor: Vendedor;
    desconto: number = 1;

    constructor(vendedor: Vendedor) {
        this.data = new Date();
        this.vendedor = vendedor;
        this.itens = [];
    }

    addProduto(produto: Produto) {
        if (this.itens.length >= MAX_PRODUTOS) {
            throw new Error("Maximo de produtos atingido")
        }
        this.itens.push(produto);
    }

    setDesconto(porcentagem: number) {
        this.desconto = 1 - porcentagem/100;
    }

    getTotalVenda() {
        let valorTotalVenda: number = 0;
        for (let p of this.itens) {
            valorTotalVenda += p.preco;
        }

        return valorTotalVenda;
    }

    getTotalVendaComDesconto() {
        const totalVenda = this.getTotalVenda();
        return totalVenda * this.desconto;
    }
}