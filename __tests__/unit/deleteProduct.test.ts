import DeleteProductService from "../../src/services/DeleteProductService";
import { createConnection, getConnection} from 'typeorm';

describe('Delete Product', () => {
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

    it('should validation product do not exist', async () => {
        const product = new DeleteProductService();

        try {
            const result = await product.execute({id: "1234"})
            expect(result).toHaveProperty('Product do not exist!');
        } catch (error: any) {
            expect(error.message).toBe('Product do not exist!');
        }
    });
});
