import { Cliente, Venda, Vendedor } from "./types";

class ApplicationController {
    public vendaController: IVendaController;
    public clienteController: IClienteController;
    public vendedorController: IVendedorController; 

    constructor(
        vendaController: IVendaController,
        clienteController: IClienteController,
        vendedorController: IVendedorController
    ) { 
        /* ... */
    }
}

interface IVendaController { 
    iniciar(clienteDAO, vendedorDAO): VideoEncoderBitrateMode;
    finalizar(Venda): void;
    buscarPorCliente(clienteDAO): Venda[];
}

interface IClienteController { 
    cadastrar(pessoaDAO): Cliente;
    buscar(clienteDAO): Cliente;
}

interface IVendedorController {
    registrar(vendedorDAO): Vendedor;
    listarVendasDeHoje(vendedorDAO): Venda[];
}

