import { IHttpRequest, IHttpResponse } from "@/presentation/protocols";
import { IController } from "@/presentation/protocols/IController";

class CadastroClienteController implements IController {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        console.log(httpRequest.body.name);
        if (!httpRequest.body.name) {
            return Promise.resolve({
                statusCode: 400,
                body: new Error("Missing param: name"),
            });
        }
        if (!httpRequest.body.email) {
            console.log(httpRequest.body.email);
            return Promise.resolve({
                statusCode: 400,
                body: new Error("Missing param: email"),
            });
        }
        return Promise.resolve({
            statusCode: 200,
            body: "",
        });
    }
}
export { CadastroClienteController };
