/* eslint-disable import/order */
/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/no-extraneous-dependencies */
import { AdapterRoute } from "./ExpressRouteAdapter";

import { IController, IHttpResponse } from "@/presentation/protocols";

import { getMockReq, getMockRes } from "@jest-mock/express";

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

        expect(SysUnderTest.consolidaParamentro(request)).toEqual({
            anyBody: "any_body",
        });
        // expect(SysUnderTest.handle.).toBe(controllerSpy);
    });
    test("should conversion empty of request parameters", () => {
        const controllerSpy = new ControllerSpy();

        const SysUnderTest = new AdapterRoute(controllerSpy);
        const request = getMockReq();

        expect(SysUnderTest.consolidaParamentro(request)).toEqual({});
    });
    test("should the controller handle is called", async () => {
        const controllerSpy = new ControllerSpy();

        const SysUnderTest = new AdapterRoute(controllerSpy);
        const request = getMockReq({
            body: { anyBody: "any_body" },
        });
        const response = getMockRes().res;
        const retorno = await SysUnderTest.handle(request, response);
        expect(retorno).toBe(response);
        expect(controllerSpy.httpResponse).toEqual({
            statusCode: 200,
            body: { data: "any_data" },
        });
    });
    test("should return null data if  body request null ", async () => {
        const controllerSpy = new ControllerSpy();
        jest.spyOn(controllerSpy, "handle").mockResolvedValueOnce({
            statusCode: 204,
            body: null,
        });
        const SysUnderTest = new AdapterRoute(controllerSpy);
        const request = getMockReq({
            data: null,
        });
        const response = getMockRes().res;
        const retorno = await SysUnderTest.handle(request, response);
        expect(retorno.status).toHaveBeenCalledWith(204);
        expect(controllerSpy.handle).toHaveBeenCalledTimes(1);
        expect(retorno.json).toHaveBeenCalledWith(null);
        expect(retorno.status).toHaveBeenCalledTimes(1);
    });
    test("should respond with 400 and valid error", async () => {
        const controllerSpy = new ControllerSpy();
        jest.spyOn(controllerSpy, "handle").mockResolvedValueOnce({
            statusCode: 400,
            body: new Error("any_error"),
        });
        const SysUnderTest = new AdapterRoute(controllerSpy);
        const request = getMockReq({
            data: "any",
        });
        const response = getMockRes().res;
        const retorno = await SysUnderTest.handle(request, response);
        expect(retorno.status).toHaveBeenCalledWith(400);
        expect(controllerSpy.handle).toHaveBeenCalledTimes(1);
        expect(retorno.json).toHaveBeenCalledWith({ error: "any_error" });
        expect(retorno.status).toHaveBeenCalledTimes(1);
    });
    test("should respond with 400 and valid error", async () => {
        const controllerSpy = new ControllerSpy();
        jest.spyOn(controllerSpy, "handle").mockResolvedValueOnce({
            statusCode: 500,
            body: new Error("any_error"),
        });
        const SysUnderTest = new AdapterRoute(controllerSpy);
        const request = getMockReq({
            data: "any",
        });
        const response = getMockRes().res;
        const retorno = await SysUnderTest.handle(request, response);
        expect(retorno.status).toHaveBeenCalledWith(500);
        expect(controllerSpy.handle).toHaveBeenCalledTimes(1);
        expect(retorno.json).toHaveBeenCalledWith({ error: "any_error" });
        expect(retorno.status).toHaveBeenCalledTimes(1);
    });
});
