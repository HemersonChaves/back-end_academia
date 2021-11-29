import * as yup from "yup";

class DataValidador {
    async Validar(data: string): Promise<boolean> {
        const dataSchema = yup.object().shape({
            data: yup.date(),
        });
        const a = await dataSchema.isValid(data);
        return a;
    }
}
export { DataValidador };
