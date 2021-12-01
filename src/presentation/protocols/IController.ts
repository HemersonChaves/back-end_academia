import { IHttpResponse } from "./http";
/**
 * Interface para disparo de solicitações http
 */
interface IController<T = any> {
    handle(httpRequest: T): Promise<IHttpResponse>;
}

export { IController };
