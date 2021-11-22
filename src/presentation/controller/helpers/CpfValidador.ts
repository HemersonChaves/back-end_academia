import { cpf } from "cpf-cnpj-validator";
import { ICpfValidador } from "@/presentation/protocols/ICpfValidador";

class CpfValidador implements ICpfValidador {
    validar(_cpf: string) {
        if (_cpf === null || undefined === _cpf) {
            return false;
        }

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
