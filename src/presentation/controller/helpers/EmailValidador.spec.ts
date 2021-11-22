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
    test("should call cpf with correct email", () => {
        const sysUnderTest = new EmailValidador();
        const emailValido = "any_email@mail.com";
        expect(sysUnderTest.Validar(emailValido)).toBeTruthy();
    });
});
