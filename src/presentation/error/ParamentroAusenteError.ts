/**
 * @class para envio de erros padronizadas para paramentro do resquest faltando
 */
class ParamentroAusenteError extends Error {
    constructor(paramName: string) {
        super(`Missing param: ${paramName}`);
        this.name = "MissingParamError";
    }
}
export { ParamentroAusenteError };
