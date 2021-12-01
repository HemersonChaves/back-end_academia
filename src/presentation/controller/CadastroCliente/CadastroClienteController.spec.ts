/* eslint-disable max-classes-per-file */
import { ParamentroInvalidoError, ServerError } from "@/presentation/error";
import { IHttpRequest } from "@/presentation/protocols";
import { IValidadorParamentro } from "@/presentation/protocols/IValidadorParamentro";
import { CpfValidador, DataValidador, EmailValidador } from "@/utils";

import { ParamentroAusenteError } from "../../error/ParamentroAusenteError";
import { CadastroClienteController } from "./CadastroClienteController";

interface ISutTypes {
    sysUnderTest: CadastroClienteController;
    cpfValidadorStub: IValidadorParamentro;
    emailValidadorStub: IValidadorParamentro;
    dataValidadorStub: DataValidador;
}
const makeDataValidador = (): DataValidador => {
    class DataValidatorStub implements DataValidador {
        async Validar(data: string): Promise<boolean> {
            return true;
        }
    }
    return new DataValidatorStub();
};
const makeEmailValidador = (): IValidadorParamentro => {
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
    const emailValidadorStub = makeEmailValidador();
    const dataValidadorStub = makeDataValidador();
    const sysUnderTest = new CadastroClienteController(
        cpfValidadorStub,
        emailValidadorStub,
        dataValidadorStub
    );
    return {
        sysUnderTest,
        cpfValidadorStub,
        emailValidadorStub,
        dataValidadorStub,
    };
};

describe("Cadastro Cliente Controller", () => {
    test("should return 400 if no name is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = <IHttpRequest>{
            // no name
            email: "any@email.com",
            cpf: "00000000000",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new ParamentroAusenteError("name"));
    });
    test("should return 400 if no email is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = <IHttpRequest>{
            name: "any name",
            // no email
            cpf: "00000000000",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new ParamentroAusenteError("email"));
    });
    test("should return 400 if no cpf is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "any@email.com",
            // no cpf
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new ParamentroAusenteError("cpf"));
    });
    test("should return 400 if no telefone is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "any@email.com",
            cpf: "00000000000",
            // telefone
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(
            new ParamentroAusenteError("telefone")
        );
    });
    test("should return 400 if no data_nascimento is provided", async () => {
        const { sysUnderTest } = makeSysUnderTest();
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "any@email.com",
            cpf: "00000000000",
            telefone: "00000000",
            // data_nascimento
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
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "any@email.com",
            cpf: "invalid_cpf",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new ParamentroInvalidoError("cpf"));
    });
    test("should call CpfValidador with correct cpf", async () => {
        const { sysUnderTest, cpfValidadorStub } = makeSysUnderTest();
        const isValidSpy = jest.spyOn(cpfValidadorStub, "Validar");
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "any@email.com",
            cpf: "10011460423",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        await sysUnderTest.handle(httpRequest);
        expect(cpfValidadorStub.Validar).toHaveBeenCalledTimes(1);
        expect(isValidSpy).toHaveBeenCalledWith("10011460423");
    });
    test("should return 500 if CpfValidador throws", async () => {
        const { sysUnderTest, cpfValidadorStub } = makeSysUnderTest();

        jest.spyOn(cpfValidadorStub, "Validar").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "correct@email.com",
            cpf: "10011460423",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });
    test("should call EmailValidador with correct email", async () => {
        const { sysUnderTest, emailValidadorStub } = makeSysUnderTest();
        const isValidSpy = jest.spyOn(emailValidadorStub, "Validar");
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "correct@email.com",
            cpf: "10011460423",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        await sysUnderTest.handle(httpRequest);
        expect(emailValidadorStub.Validar).toHaveBeenCalledTimes(1);
        expect(isValidSpy).toHaveBeenCalledWith("correct@email.com");
    });
    test("should return 500 if EmailValidador throws", async () => {
        const { sysUnderTest, emailValidadorStub } = makeSysUnderTest();

        jest.spyOn(emailValidadorStub, "Validar").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "correct@email.com",
            cpf: "10011460423",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });
    test("should call DataNascimentoValidador with correct dataNascimento", async () => {
        const { sysUnderTest, dataValidadorStub } = makeSysUnderTest();
        const isValidSpy = jest.spyOn(dataValidadorStub, "Validar");
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "any@email.com",
            cpf: "10011460423",
            telefone: "00000000",
            data_nascimento: "11/11/2021",
        };
        await sysUnderTest.handle(httpRequest);
        expect(dataValidadorStub.Validar).toHaveBeenCalledTimes(1);
        expect(isValidSpy).toHaveBeenCalledWith("11/11/2021");
    });
    test("should return 500 if DataValidador throws", async () => {
        const { sysUnderTest, dataValidadorStub } = makeSysUnderTest();

        jest.spyOn(dataValidadorStub, "Validar").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpRequest = <IHttpRequest>{
            name: "any name",
            email: "correct@email.com",
            cpf: "10011460423",
            telefone: "00000000",
            data_nascimento: "00/00/0000",
        };
        const httpResponse = await sysUnderTest.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new ServerError());
    });
    it.todo("should call TelefoneValidador with correct telefone");
});
