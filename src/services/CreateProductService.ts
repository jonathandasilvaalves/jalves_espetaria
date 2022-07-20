import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
    name: string;
    qty: number;
} 

class CreateProductService {
    public async execute({name, qty}: Request) {

        const Ajv = require("ajv");
        const ajv = new Ajv();

        const schema = {
            type: 'object',
            properties: {
                name: {type: 'string'},
                qty: {type: 'integer'}
            },
            required: ["name", "qty"],
            additionalProperties: false
        }

        const validate = ajv.compile(schema);
        const valid = validate({name, qty});

        if (!valid) {
            throw new Error(validate.errors[0].message);
        }
        const productRepository = getRepository(Product);

        const productExist = await productRepository.findOne({
            where: {name},
        });

        if(productExist) {
            throw new Error('There is a product with this name!');
        }

        if(qty < 0) {
            throw new Error('Qty cannot be less than zero');
        }

        const product = productRepository.create({
           name,
           qty 
        });

        await productRepository.save(product);

        return product;
    }
}

export default CreateProductService;