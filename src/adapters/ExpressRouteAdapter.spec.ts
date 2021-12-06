/* eslint-disable import/order */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/no-extraneous-dependencies */
import { AdapterRoute } from "./ExpressRouteAdapter";

import {
    IController,
    IHttpRequest,
    IHttpResponse,
} from "@/presentation/protocols";

import { getMockReq } from "@jest-mock/express";

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
        const sutProperty = Object.getOwnPropertyDescriptors(SysUnderTest);
        expect(sutProperty.controller.value).toBe(controllerSpy);
    });
    test("should conversion of request parameters", () => {
        const controllerSpy = new ControllerSpy();

        const SysUnderTest = new AdapterRoute(controllerSpy);
        const request = getMockReq({
            body: { anyBody: "any_body" },
        });

        expect(SysUnderTest.condesaParamentros(request)).toEqual({
            anyBody: "any_body",
        });
        // expect(SysUnderTest.handle.).toBe(controllerSpy);
    });
});
