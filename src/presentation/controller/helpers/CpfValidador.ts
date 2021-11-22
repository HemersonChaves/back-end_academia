import { cpf } from "cpf-cnpj-validator";
import { IValidadorParamentro } from "@/presentation/protocols";

class CpfValidador implements IValidadorParamentro {
    Validar(_cpf: string): boolean {
        const cpfValido = _cpf
            .replace(".", "")
            .replace(".", "")
            .replace("-", "");

        if (cpfValido.length !== 11) {
            return false;
        }

        return cpf.isValid(cpfValido);
    }
}
export { CpfValidador };
