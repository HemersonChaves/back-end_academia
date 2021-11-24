import { IValidadorParamentro } from "@/presentation/protocols";

class DataValidador implements IValidadorParamentro {
    Validar(data: string): boolean {
        const dataValido = data;

        // if (new Date(data) !== "Invalid Date") {
        return false;
        // }
    }
}
export { DataValidador };
