import { MissingParamError } from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";

import { badRequest } from "../helpers/http-helper";

class CadastroClienteController implements IController {
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
        return Promise.resolve({
            statusCode: 200,
            body: "",
        });
    }
}
export { CadastroClienteController };
