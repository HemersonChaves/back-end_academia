import * as yup from "yup";

import { DataValidador } from ".";

const makeSut = (): DataValidador => {
    return new DataValidador();
};
describe("Data validador", () => {
    test("should return false if yup.isvalid return false", async () => {
        const sysUnderTest = makeSut();
        expect(await sysUnderTest.Validar("")).toBeFalsy();
    });
});
