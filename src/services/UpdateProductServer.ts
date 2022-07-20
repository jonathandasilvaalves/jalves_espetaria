import { getRepository } from 'typeorm'
import Product from '../models/Product';

interface Request {
    id: string;
    name: string;
    qty: number;
} 

class UpdateProductServer {
    public async execute({id, name, qty}:Request) {
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
            where: {product_id: id}
        });

        if(!productExist) {
            throw new Error('Product do not exist!');
        }

        productExist.name = name;

        await productRepository.save(productExist);

        return productExist;
    }

}

export default UpdateProductServer;