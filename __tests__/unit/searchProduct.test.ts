import SearchProductServer from "../../src/services/SearchProductServer";
import CreateProductService from "../../src/services/CreateProductService";
import { createConnection, getConnection } from 'typeorm';


describe('Search Product', () => {
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

    it('should validation search', async () => { 
        const searchRepository = new SearchProductServer();
        const productRepository = new CreateProductService();

        await productRepository.execute({
            name: "Teste",
            qty: 1
        });
        const search = await searchRepository.execute({name: 'Teste', page: 0});

        expect(search).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: expect.any(String),
                    product_id: expect.any(String),
                    qty: expect.any(Number)
                })
            ])
        );
    });
});