import { ICpfValidador } from "@/presentation/protocols/ICpfValidador";

class CpfValidador implements ICpfValidador {
    validar(cpf: string) {
        return true;
    }
}
export { CpfValidador };
