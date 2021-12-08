import { CadastroClienteController } from "@/presentation/controller/CadastroCliente/CadastroClienteController";
import { IController } from "@/presentation/protocols";
import { CpfValidador, DataValidador, EmailValidador } from "@/utils";

const cpfValidador = new CpfValidador();
const emailValidador = new EmailValidador();
const dataValidador = new DataValidador();

export const makeCadastroClienteController = (): IController => {
    const controller = new CadastroClienteController(
        cpfValidador,
        emailValidador,
        dataValidador
    );
    return controller;
};
