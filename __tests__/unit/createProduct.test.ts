import CreateProductService from "../../src/services/CreateProductService";
import { createConnection, getConnection } from 'typeorm';

describe('Create Product', () => {
    beforeEach(() => {
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [
              "./src/models/*.ts"
            ],
            synchronize: true,
            logging: false
        });
    });
    afterEach(async () => {
        await getConnection().close();
    });

    const productInvalid = {
        name: "Teste",
        qty: 1
    }

    it('should validate invalid product',async() => {
        const product = new CreateProductService();

        try {
            await product.execute(productInvalid);
            const validate = await product.execute(productInvalid);
            expect(validate).toBe('Error');
        } catch(error: any) {
            expect(error.message).toBe('There is a product with this name!');
        }
    });
});