/* eslint-disable import/order */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/no-extraneous-dependencies */
import { AdapterRoute } from "./ExpressRouteAdapter";

import { IController, IHttpResponse } from "@/presentation/protocols";

class ControllerSpy implements IController {
    httpResponse = <IHttpResponse>{
        statusCode: 200,
        body: { data: "any_data" },
    };
    request: any;

    async handle(request: any): Promise<IHttpResponse> {
        this.request = request;
        return this.httpResponse;
    }
}

describe("Adapter Router Express", () => {
    test("should bind constructor correct controller", () => {
        const controllerSpy = new ControllerSpy();

        const SysUnderTest = new AdapterRoute(controllerSpy);
        const exampleProto = Object.getOwnPropertyDescriptors(SysUnderTest);
        expect(exampleProto.controller.value).toBe(controllerSpy);
    });
});
