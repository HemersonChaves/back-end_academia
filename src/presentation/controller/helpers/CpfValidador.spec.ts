import { cpf } from "cpf-cnpj-validator";

import { CpfValidador } from "./CpfValidador";

describe("Cpf Validador", () => {
    test("return false if cpf is only string or not number", () => {
        const sysUnderTest = new CpfValidador();
        expect(sysUnderTest.Validar("")).toBeFalsy();
        expect(sysUnderTest.Validar("invalidcpf")).toBeFalsy();
    });
    test("return false if cpf is not valided", () => {
        const sysUnderTest = new CpfValidador();
        expect(sysUnderTest.Validar("00000000000")).toBeFalsy();
        expect(sysUnderTest.Validar("11111111111")).toBeFalsy();
        expect(sysUnderTest.Validar("33333333333")).toBeFalsy();
        expect(sysUnderTest.Validar("44444444444")).toBeFalsy();
        expect(sysUnderTest.Validar("55555555555")).toBeFalsy();
        expect(sysUnderTest.Validar("66666666666")).toBeFalsy();
        expect(sysUnderTest.Validar("77777777777")).toBeFalsy();
        expect(sysUnderTest.Validar("88888888888")).toBeFalsy();
        expect(sysUnderTest.Validar("99999999999")).toBeFalsy();
        expect(sysUnderTest.Validar("12345678909")).toBeFalsy();
    });
    test("should call cpf with correct cpf", () => {
        const sysUnderTest = new CpfValidador();
        const cpfValido = cpf.generate();
        expect(sysUnderTest.Validar(cpfValido)).toBeTruthy();
    });
});
