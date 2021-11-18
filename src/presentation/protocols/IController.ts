import { IHttpRequest, IHttpResponse } from "./http";
/**
 * Interface para disparo de solicitações http
 */
interface IController {
    handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}

export { IController };
