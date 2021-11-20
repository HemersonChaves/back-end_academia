import { ICpfValidador } from "@/presentation/protocols/ICpfValidador";

class CpfValidador implements ICpfValidador {
    validar(cpf: string) {
        if (cpf === null || undefined === cpf) {
            return false;
        }

        const cpfValido = cpf
            .replace(".", "")
            .replace(".", "")
            .replace("-", "");

        if (cpfValido.length !== 11) {
            return false;
        }
        return true;
    }
}
export { CpfValidador };
