import { CpfValidador } from "./CpfValidador";

describe("Cpf Validador", () => {
    test("return false if cpf is only string or not number", () => {
        const sysUnderTest = new CpfValidador();
        expect(sysUnderTest.validar("")).toBeFalsy();
        expect(sysUnderTest.validar("invalidcpf")).toBeFalsy();
    });
    test("return false if cpf is not valided", () => {
        const sysUnderTest = new CpfValidador();
        expect(sysUnderTest.validar("00000000000")).toBeFalsy();
        expect(sysUnderTest.validar("11111111111")).toBeFalsy();
        expect(sysUnderTest.validar("22222222222")).toBeFalsy();
        expect(sysUnderTest.validar("33333333333")).toBeFalsy();
        expect(sysUnderTest.validar("44444444444")).toBeFalsy();
        expect(sysUnderTest.validar("55555555555")).toBeFalsy();
        expect(sysUnderTest.validar("66666666666")).toBeFalsy();
        expect(sysUnderTest.validar("77777777777")).toBeFalsy();
        expect(sysUnderTest.validar("88888888888")).toBeFalsy();
        expect(sysUnderTest.validar("99999999999")).toBeFalsy();
        expect(sysUnderTest.validar("12345678909")).toBeFalsy();
    });
    it.todo("should call cpf with correct cpf");
});
