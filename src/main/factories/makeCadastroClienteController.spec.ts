import { CadastroClienteController } from "@/presentation/controller/CadastroCliente/CadastroClienteController";

import { makeCadastroClienteController } from "./makeCadastroClienteController";

describe("Make Cadastro Cliente Controller", () => {
    test("should call CadastroClienteController with the class validations", () => {
        expect(makeCadastroClienteController()).toBeInstanceOf(
            CadastroClienteController
        );
    });
});
