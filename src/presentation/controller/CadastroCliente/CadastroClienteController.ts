import {
    ParamentroAusenteError,
    ParamentroInvalidoError,
} from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";
import { CpfValidador, DataValidador, EmailValidador } from "@/utils";

import { badRequest, serverError } from "../helpers/http-helper";

interface IDadosCadastroCliente {
    name: string;
    email: string;
    cpf: string;
    telefone: string;
    data_nascimento: string;
}

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
     * Lida com as requisições (request) http
     *
     * @param httpRequest objeto com paramentros (name, email, cpf, telefone, data_nascimento)
     * @returns IHttpResponse objeto com a respostas http
     */
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const requireFields = [
                "name",
                "email",
                "cpf",
                "telefone",
                "data_nascimento",
            ];

            for (const field of requireFields) {
                if (!(field in httpRequest)) {
                    return Promise.resolve(
                        badRequest(new ParamentroAusenteError(field))
                    );
                }
            }

            const { cpf, email, data_nascimento } = <IDadosCadastroCliente>(
                httpRequest
            );
            const cpfValido = this.cpfValidador.Validar(cpf);
            if (!cpfValido) {
                return await badRequest(new ParamentroInvalidoError("cpf"));
            }
            const emailValido = this.emailValidador.Validar(email);
            if (!emailValido) {
                return await badRequest(new ParamentroInvalidoError("email"));
            }
            const dataValida = this.dataValidador.Validar(data_nascimento);
            if (!dataValida) {
                return await badRequest(
                    new ParamentroInvalidoError("data_nascimento")
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
export { CadastroClienteController, IDadosCadastroCliente };
