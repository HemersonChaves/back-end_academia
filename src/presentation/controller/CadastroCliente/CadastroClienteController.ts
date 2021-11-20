import { MissingParamError } from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";
import { ICpfValidador } from "@/presentation/protocols/ICpfValidador";

// import { CpfValidador } from "../helpers/CpfValidador";

import { badRequest } from "../helpers/http-helper";

class CadastroClienteController implements IController {
    private readonly cpfValidador: ICpfValidador;

    constructor(cpfValidador: ICpfValidador) {
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
                    badRequest(new MissingParamError(field))
                );
            }
        }
        const { cpf } = httpRequest.body.cpf;
        const validado = this.cpfValidador.validar(cpf);
        if (!validado) {
            return Promise.resolve(badRequest(new MissingParamError("cpf")));
        }
        return Promise.resolve({
            statusCode: 200,
            body: "",
        });
    }
}
export { CadastroClienteController };
