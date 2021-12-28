// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { app } from "@/main/server";

afterAll((done) => {
    done();
});
describe("Rotas cliente", () => {
    test("should return error 400 if not send params", async () => {
        const response = await request(app)
            .post("/clientes")
            .send({})
            .expect(400);

        expect(response.body.error).toBeTruthy();
    });
    it.todo("should be able to create a new client");
    it.todo(
        "should not be able to create a new client when client already exists"
    );
    it.todo("should be able to show client data");
});
