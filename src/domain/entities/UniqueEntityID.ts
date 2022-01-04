interface IUniqueEntityID<T> {
    generateID(): T;
}
abstract class UniqueEntityID<T> implements IUniqueEntityID<T> {
    protected value: T;
    abstract generateID(): T;
    constructor(value: T) {
        this.value = value;
    }
    public equals(id?: UniqueEntityID<unknown>): boolean {
        let isEquals = false;
        if (!id || !UniqueEntityID.isIdentifier(id)) {
            return isEquals;
        }

        if (id.toValue() === this.value) {
            isEquals = true;
        }
        return isEquals;
    }

    public toString(): string {
        return String(this.value);
    }

    public toValue(): T {
        return this.value;
    }
    public static isIdentifier = (
        id: unknown
    ): id is IUniqueEntityID<unknown> => {
        return id instanceof UniqueEntityID;
    };
}
export { IUniqueEntityID, UniqueEntityID };
