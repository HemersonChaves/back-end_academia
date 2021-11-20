/**
 *  @class para formatação de erros por mensagens de parâmentros errados
 */
class ParamentroInvalidoError extends Error {
    constructor(paramName: string) {
        super(`Parâmetro invalido: ${paramName}`);
        this.name = "Parâmetro invalido";
    }
}
export { ParamentroInvalidoError };
