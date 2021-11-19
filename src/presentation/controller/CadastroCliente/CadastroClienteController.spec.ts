import { MissingParamError } from "../../error/MissingParamErro";
import { CadastroClienteController } from "./CadastroClienteController";

const makeSysUnderTest = (): CadastroClienteController => {
    return new CadastroClienteController();
};

describe("Cadastro Cliente Controller", () => {
    test("should return 400 if no name is provided", async () => {
        const sysUnderTest = makeSysUnderTest();
        const httpRequest = {
            body: {
                // no name
                email: "any@email.com",
                cpf: "00000000000",
                telefone: "00000000",
                data_nascimento: "00/00/0000",
            },
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("name"));
    });
    test("should return 400 if no email is provided", async () => {
        const sysUnderTest = makeSysUnderTest();
        const httpRequest = {
            body: {
                name: "any name",
                // no email
                cpf: "00000000000",
                telefone: "00000000",
                data_nascimento: "00/00/0000",
            },
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new Error("Missing param: email"));
    });
    it.todo("should return 400 if no cpf is provided");
    it.todo("should return 400 if no telefone is provided");
    it.todo("should return 400 if no data_nascimento is provided");
});
