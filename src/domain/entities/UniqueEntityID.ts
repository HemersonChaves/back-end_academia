interface IUniqueEntityID<T> {
    generateID(): T;
}
abstract class UniqueEntityID<T> implements IUniqueEntityID<T> {
    protected value: T;
    abstract generateID(): T;
    constructor(value: T) {
        this.value = value;
    }
    // public equals(id?: UniqueEntityID): boolean {
    //     if (!id || !UniqueEntityID.isIdentifier(id)) {
    //         return false;
    //     }

    //     return id.toValue() === this.value;
    // }

    public toString(): string {
        return String(this.value);
    }

    public toValue(): T {
        return this.value;
    }
    // public static isIdentifier = (id: unknown): id is UniqueEntityID => {
    //     return id instanceof UniqueEntityID;
    // };
}
export { IUniqueEntityID, UniqueEntityID };
