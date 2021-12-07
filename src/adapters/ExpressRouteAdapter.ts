import { Request, Response } from "express";
import {
    IController,
    IHttpRequest,
    IHttpResponse,
} from "@/presentation/protocols";

export class AdapterRoute {
    private readonly controller: IController;
    constructor(controller: IController) {
        this.controller = controller;
    }
    /**
     * captura todos os paramentros e condensa em um objeto
     * @param requestExpress
     * @returns object com paramentros
     */
    consolidaParamentro(requestExpress: Request): IHttpRequest {
        const params = <IHttpRequest>{
            ...(requestExpress.body || {}),
            ...(requestExpress.params || {}),
        };
        return params;
    }
    /**
     * adapta e converte os paramentros do request
     */
    async handle(
        requestExpress: Request,
        responseExpress: Response
    ): Promise<Response> {
        const paramentro = this.consolidaParamentro(requestExpress);
        const httpResponse = await this.controller.handle(paramentro);
        return responseExpress;
    }
    //     const request = {
    //         ...(requestExpress.body || {}),
    //         ...(requestExpress.params || {}),
    //     };
    //     const httpResponse = await this.controller.handle(request);
    //     if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    //         responseExpress
    //             .status(httpResponse.statusCode)
    //             .json(httpResponse.body);
    //     } else {
    //         responseExpress.status(httpResponse.statusCode).json({
    //             error: httpResponse.body.message,
    //         });
    //     }
    //     return responseExpress;
    // }
}
