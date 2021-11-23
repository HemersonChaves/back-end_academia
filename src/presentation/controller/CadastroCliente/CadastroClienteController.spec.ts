/* eslint-disable max-classes-per-file */
import { cpf } from "cpf-cnpj-validator";
import { ParamentroInvalidoError } from "@/presentation/error";
import { IValidadorParamentro } from "@/presentation/protocols/IValidadorParamentro";

import { ParamentroAusenteError } from "../../error/ParamentroAusenteError";
import { CpfValidador } from "../helpers/CpfValidador";
import { EmailValidador } from "../helpers/EmailValidador";
import { CadastroClienteController } from "./CadastroClienteController";

interface ISutTypes {
    sysUnderTest: CadastroClienteController;
    cpfValidadorStub: IValidadorParamentro;
    emailValidadorStub: IValidadorParamentro;
}
const makeEmailValidator = (): IValidadorParamentro => {
    class EmailValidatorStub implements EmailValidador {
        Validar(email: string): boolean {
            return true;
        }
    }
    return new EmailValidatorStub();
};

const makerValidadorCpf = (): IValidadorParamentro => {
    class CpfValidadorStub implements CpfValidador {
        Validar(cpf: string): boolean {
            return true;
        }
    }
    return new CpfValidadorStub();
};
const makeSysUnderTest = (): ISutTypes => {
    const cpfValidadorStub = makerValidadorCpf();
    const emailValidadorStub = makeEmailValidator();
    const sysUnderTest = new CadastroClienteController(
        cpfValidadorStub,
        emailValidadorStub
    );
    return { sysUnderTest, cpfValidadorStub, emailValidadorStub };
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
        expect(httpResponse.body).toEqual(new ParamentroAusenteError("name"));
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
        expect(httpResponse.body).toEqual(new ParamentroAusenteError("email"));
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
        expect(httpResponse.body).toEqual(new ParamentroAusenteError("cpf"));
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
        expect(httpResponse.body).toEqual(
            new ParamentroAusenteError("telefone")
        );
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
            new ParamentroAusenteError("data_nascimento")
        );
    });
    test("should return 400 if an invalid cpf is provided", async () => {
        const { sysUnderTest, cpfValidadorStub } = makeSysUnderTest();

        jest.spyOn(cpfValidadorStub, "Validar").mockReturnValueOnce(false);
        const httpRequest = {
            body: {
                name: "any name",
                email: "any@email.com",
                cpf: "invalid_cpf",
                telefone: "00000000",
                data_nascimento: "00/00/0000",
            },
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new ParamentroInvalidoError("cpf"));
    });
    test("should call CpfValidador with correct cpf", async () => {
        const { sysUnderTest, cpfValidadorStub } = makeSysUnderTest();
        const isValidSpy = jest.spyOn(cpfValidadorStub, "Validar");
        const httpRequest = {
            body: {
                name: "any name",
                email: "any@email.com",
                cpf: "10011460423",
                telefone: "00000000",
                data_nascimento: "00/00/0000",
            },
        };
        await sysUnderTest.handle(httpRequest);
        expect(cpfValidadorStub.Validar).toHaveBeenCalledTimes(1);
        expect(isValidSpy).toHaveBeenCalledWith("10011460423");
    });
    test("should call EmailValidador with correct email", async () => {
        const { sysUnderTest, emailValidadorStub } = makeSysUnderTest();
        const isValidSpy = jest.spyOn(emailValidadorStub, "Validar");
        const httpRequest = {
            body: {
                name: "any name",
                email: "correct@email.com",
                cpf: "10011460423",
                telefone: "00000000",
                data_nascimento: "00/00/0000",
            },
        };
        await sysUnderTest.handle(httpRequest);
        expect(emailValidadorStub.Validar).toHaveBeenCalledTimes(1);
        expect(isValidSpy).toHaveBeenCalledWith("correct@email.com");
    });
    it.todo("should call DataNascimentoValidador with correct dataNascimento");
    it.todo("should call TelefoneValidador with correct telefone");
});
