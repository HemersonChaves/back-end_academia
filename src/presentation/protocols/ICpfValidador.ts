/**
 * Interface para validação de cpf
 */
interface ICpfValidador {
    validar(cpf: string): boolean;
}
export { ICpfValidador };
