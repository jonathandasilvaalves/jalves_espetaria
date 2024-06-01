import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
    page: number;
    name: string;
}

class SearchProductServer {
    public async execute({page, name}: Request) {
        const productRepository = getRepository(Product);

        if(name !== undefined) {

            const products = await productRepository.find({
                skip: page-1,
                take: 10,
                where: [
                    { name }
                ]
            });
            return products
        }

        const products = await productRepository.find({
            skip: page-1,
            take: 10
        });

        return products;
    }
}

export default SearchProductServer;