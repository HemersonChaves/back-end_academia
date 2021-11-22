import { EmailValidador } from "./EmailValidador";

describe("Email CpfValidador", () => {
    test("returns false if email is not correct", () => {
        const sysUnderTest = new EmailValidador();
        expect(sysUnderTest.Validar("emailinvalido.com")).toBeFalsy();
        expect(sysUnderTest.Validar("emailinvalido@")).toBeFalsy();
        expect(
            sysUnderTest.Validar(
                "emailinvalido_____________________________________________________@"
            )
        ).toBeFalsy();
        expect(sysUnderTest.Validar("emailinvalido@com")).toBeFalsy();
    });
    it.todo("should call cpf with correct email");
});
