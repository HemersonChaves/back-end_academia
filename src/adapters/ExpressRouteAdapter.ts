import { Request, Response } from "express";
import { IController, IHttpRequest } from "@/presentation/protocols";

export class AdapterRoute {
    private readonly controller: IController;
    constructor(controller: IController) {
        this.controller = controller;
    }
    condesaParamentros(requestExpress: Request): IHttpRequest {
        const params = <IHttpRequest>{
            ...(requestExpress.body || {}),
            ...(requestExpress.params || {}),
        };
        return params;
    }
    /**
     * adapta e converte os paramentros do request
     */
    // async handle(requestExpress: Request, responseExpress: Response) {
    //     const request = {
    //         ...(requestExpress.body || {}),
    //         ...(requestExpress.params || {}),
    //     };
    // }
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
