import { Entity } from ".";

interface IProps {
    prop_a: string;
    prop_b: unknown;
    prop_c: number;
}

class EntityConcret<T> extends Entity<T> {}
describe("Entity", () => {
    test("should entity instance with any types props", () => {
        const props: IProps = {
            prop_a: "props",
            prop_b: false,
            prop_c: 123,
        };
        const SysUnderTest = new EntityConcret(props);
    });
});
