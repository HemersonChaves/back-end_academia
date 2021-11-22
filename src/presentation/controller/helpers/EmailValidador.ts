import { IValidadorParamentro } from "@/presentation/protocols/IValidadorParamentro";
/**
 *  fonte: https://github.com/manishsaraan/email-validator/blob/master/index.js
 */
class EmailValidador implements IValidadorParamentro {
    Validar(email: string): boolean {
        const emailParts = email.split("@");

        if (emailParts.length !== 2) {
            return false;
        }

        const account = emailParts[0];
        const address = emailParts[1];

        if (account.length > 64) {
            return false;
        }
        if (address.length > 255) {
            return false;
        }

        const domainParts = address.split(".");
        if (
            domainParts.some((part) => {
                return part.length > 63;
            })
        ) {
            return false;
        }

        const tester =
            /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!tester.test(email)) {
            return false;
        }

        return true;
    }
}

export { EmailValidador };
