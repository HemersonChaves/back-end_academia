import {
    ParamentroAusenteError,
    ParamentroInvalidoError,
} from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";
import { CpfValidador, DataValidador, EmailValidador } from "@/utils";

import { badRequest, serverError } from "../helpers/http-helper";
/**
 * Fornece métodos que respondem às solicitações HTTP de cadastro de cliente
 */
class CadastroClienteController implements IController {
    private readonly cpfValidador: CpfValidador;
    private readonly emailValidador: EmailValidador;
    private readonly dataValidador: DataValidador;

    constructor(
        cpfValidador: CpfValidador,
        emailValidador: EmailValidador,
        dataValidador: DataValidador
    ) {
        this.cpfValidador = cpfValidador;
        this.emailValidador = emailValidador;
        this.dataValidador = dataValidador;
    }
    /**
     * Lidas com as requisições (request) http
     *
     * @param httpRequest objeto com paramentros (name, email, cpf, telefone, data_nascimento)
     * @returns IHttpResponse objeto com a respostas http
     */
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requireFields = [
                "name",
                "email",
                "cpf",
                "telefone",
                "data_nascimento",
            ];
            for (const field of requireFields) {
                if (!httpRequest.body[field]) {
                    return Promise.resolve(
                        badRequest(new ParamentroAusenteError(field))
                    );
                }
            }
            const { cpf, email, data_nascimento } = httpRequest.body;
            const cpfValido = this.cpfValidador.Validar(cpf);
            if (!cpfValido) {
                return Promise.resolve(
                    badRequest(new ParamentroInvalidoError("cpf"))
                );
            }
            const emailValido = this.emailValidador.Validar(email);
            if (!emailValido) {
                return Promise.resolve(
                    badRequest(new ParamentroInvalidoError("email"))
                );
            }
            const dataValida = this.dataValidador.Validar(data_nascimento);
            if (!dataValida) {
                return Promise.resolve(
                    badRequest(new ParamentroInvalidoError("data_nascimento"))
                );
            }
            return Promise.resolve({
                statusCode: 200,
                body: "",
            });
        } catch (error) {
            return Promise.resolve(serverError());
        }
    }
}
export { CadastroClienteController };
