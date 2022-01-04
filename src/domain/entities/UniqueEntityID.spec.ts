import {
    UniqueEntityID,
    UniqueIDIntConcretMock,
    UniqueIDStringConcretMock,
} from ".";

describe("UniqueEntityID", () => {
    test("should UniqueEntityID instanced with string params", () => {
        const idstring = "123";
        const SysUnderTest = new UniqueIDStringConcretMock(idstring);

        expect(SysUnderTest).toBeInstanceOf(UniqueEntityID);
        expect(SysUnderTest).toBeTruthy();
        expect(SysUnderTest.toValue()).toBe(idstring);
    });
    test("should UniqueEntityID instanced with number params", () => {
        const idNumber = 123;
        const SysUnderTest = new UniqueIDIntConcretMock(idNumber);
        expect(SysUnderTest).toBeInstanceOf(UniqueEntityID);
        expect(SysUnderTest).toBeTruthy();
        expect(SysUnderTest.toValue()).toBe(idNumber);
    });
});
