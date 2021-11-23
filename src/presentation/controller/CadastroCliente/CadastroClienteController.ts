import {
    ParamentroAusenteError,
    ParamentroInvalidoError,
} from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";

import { CpfValidador } from "../helpers/CpfValidador";
import { EmailValidador } from "../helpers/EmailValidador";
import { badRequest } from "../helpers/http-helper";

class CadastroClienteController implements IController {
    private readonly cpfValidador: CpfValidador;
    private readonly emailValidador: EmailValidador;

    constructor(cpfValidador: CpfValidador, emailValidador: EmailValidador) {
        this.cpfValidador = cpfValidador;
        this.emailValidador = emailValidador;
    }

    handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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
        const { cpf, email } = httpRequest.body;
        const cpfValidado = this.cpfValidador.Validar(cpf);
        if (!cpfValidado) {
            return Promise.resolve(
                badRequest(new ParamentroInvalidoError("cpf"))
            );
        }
        const emailValidado = this.emailValidador.Validar(email);
        if (!emailValidado) {
            return Promise.resolve(
                badRequest(new ParamentroInvalidoError("email"))
            );
        }
        return Promise.resolve({
            statusCode: 200,
            body: "",
        });
    }
}
export { CadastroClienteController };
