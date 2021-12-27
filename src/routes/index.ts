import { Router } from "express";

import { clienteRoutes } from "./Cliente.routes";

const router = Router();

router.use("/clientes", clienteRoutes);

export { router };
