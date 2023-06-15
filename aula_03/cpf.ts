class CPF { 
    numero_cpf: string;

    constructor(numero_cpf: string) {
        if (!this.validar(numero_cpf)) {
            throw new Error("Numero de CPF inválido")
        }
        this.numero_cpf = numero_cpf;
    }

    validar(numero_cpf: string): boolean {
        let ehValido = true;

        // fazer a lógica de validação, e atualizar o valor
        // de 'ehValido' de acordo com a validação
        return ehValido;
    }
}