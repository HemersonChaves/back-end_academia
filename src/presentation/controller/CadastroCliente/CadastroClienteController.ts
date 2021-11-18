import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";

class CadastroClienteController implements IController {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        return Promise.resolve({
            statusCode: 400,
            body: "",
        });
    }
}
export { CadastroClienteController };
