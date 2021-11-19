import { MissingParamError } from "@/presentation/error";
import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";

class CadastroClienteController implements IController {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const requireFields = ["name", "email"];
        for (const field of requireFields) {
            if (!httpRequest.body[field]) {
                return Promise.resolve({
                    statusCode: 400,
                    body: new MissingParamError(field),
                });
            }
        }
        return Promise.resolve({
            statusCode: 200,
            body: "",
        });
    }
}
export { CadastroClienteController };
