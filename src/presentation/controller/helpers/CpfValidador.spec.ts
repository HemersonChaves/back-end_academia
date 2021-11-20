import { CpfValidador } from "./CpfValidador";

describe("Cpf Validador", () => {
    test("return false if cpf is only string or not number", () => {
        const sysUnderTest = new CpfValidador();
        const cpf = "invalidcpf";

        const validado = sysUnderTest.validar(cpf);

        expect(validado).toBe(false);
    });
    it.todo("returns false if cpf is not formated");
    it.todo("should call cpf with correct cpf");
});
