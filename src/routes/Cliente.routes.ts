import { Router } from "express";
import { AdapterRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeCadastroClienteController } from "@/main/factories/makeCadastroClienteController";

const clienteRoutes = Router();

clienteRoutes.post("/", (request, response) => {
    const cadastroClienteController = makeCadastroClienteController();
    const CadastroClienteRoute = new AdapterRoute(cadastroClienteController);
    CadastroClienteRoute.handle(request, response);
});

export { clienteRoutes };
