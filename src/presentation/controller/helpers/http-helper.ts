import { IHttpResponse } from "@/presentation/protocols";

const badRequest = (error: Error): IHttpResponse => ({
    statusCode: 400,
    body: error,
});

export { badRequest };
