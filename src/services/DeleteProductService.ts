import { getRepository } from 'typeorm';
import Product from '../models/Product';

interface Request {
    id: string;
}

class DeleteProductService {
    public async execute({id}:Request) {
        const productRepository = getRepository(Product);
    
        const product = await productRepository.findOne({
            where: {product_id: id}
        });
    
        if(!product) {
            throw new Error('Product do not exist!');
        }

        await productRepository.delete(product);

        return true;
    }
}

export default DeleteProductService;