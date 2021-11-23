import {
    ParamentroAusenteError,
    ParamentroInvalidoError,
} from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";

import { CpfValidador } from "../helpers/CpfValidador";
import { badRequest } from "../helpers/http-helper";

class CadastroClienteController implements IController {
    private readonly cpfValidador: CpfValidador;

    constructor(cpfValidador: CpfValidador) {
        this.cpfValidador = cpfValidador;
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
        const { cpf } = httpRequest.body;
        console.log(cpf);
        const validado = this.cpfValidador.Validar(cpf);
        if (!validado) {
            return Promise.resolve(
                badRequest(new ParamentroInvalidoError("cpf"))
            );
        }
        return Promise.resolve({
            statusCode: 200,
            body: "",
        });
    }
}
export { CadastroClienteController };
