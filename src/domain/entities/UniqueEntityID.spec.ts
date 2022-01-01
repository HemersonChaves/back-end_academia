import { UniqueEntityID } from ".";

describe("UniqueEntityID", () => {
    test("should UniqueEntityID instanced with string params", () => {
        const idNumber = "123";
        const SysUnderTest = new UniqueEntityID(idNumber);
        expect(SysUnderTest).toBeInstanceOf(UniqueEntityID);
        expect(SysUnderTest).toBeTruthy();
    });
    test("should UniqueEntityID instanced with number params", () => {
        const idNumber = 123;
        const SysUnderTest = new UniqueEntityID(idNumber);
        expect(SysUnderTest).toBeInstanceOf(UniqueEntityID);
        expect(SysUnderTest).toBeTruthy();
    });
});
