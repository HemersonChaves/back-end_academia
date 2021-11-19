import { MissingParamError } from "../../error/MissingParamErro";
import { CadastroClienteController } from "./CadastroClienteController";

interface ISutTypes {
    sysUnderTest: CadastroClienteController;
}
const makeSysUnderTest = (): ISutTypes => {
    const sysUnderTest = new CadastroClienteController();
    return { sysUnderTest };
};

describe("Cadastro Cliente Controller", () => {
    test("should return 400 if no name is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
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
        const { sysUnderTest } = makeSysUnderTest();
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
        expect(httpResponse.body).toEqual(new MissingParamError("email"));
    });
    test("should return 400 if no cpf is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = {
            body: {
                name: "any name",
                email: "any@email.com",
                // no cpf
                telefone: "00000000",
                data_nascimento: "00/00/0000",
            },
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("cpf"));
    });
    test("should return 400 if no telefone is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = {
            body: {
                name: "any name",
                email: "any@email.com",
                cpf: "00000000000",
                // telefone
                data_nascimento: "00/00/0000",
            },
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError("telefone"));
    });
    test("should return 400 if no data_nascimento is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = {
            body: {
                name: "any name",
                email: "any@email.com",
                cpf: "00000000000",
                telefone: "00000000",
                // data_nascimento
            },
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(
            new MissingParamError("data_nascimento")
        );
    });
});
