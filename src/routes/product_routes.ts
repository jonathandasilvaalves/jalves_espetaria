import { Router } from 'express';

import ensureAutheticated from '../middlewares/ensureAuthenticated';
import CreateProductService from '../services/CreateProductService';
import UpdateProductServer from '../services/UpdateProductServer';
import DeleteProductService from '../services/DeleteProductService';
import SearchProductServer from '../services/SearchProductServer';


const productRouter = Router();

productRouter.post('/create', ensureAutheticated, async (request, response) => {
    try {
        const { name, qty } = request.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            qty
        });

        return response.json(product);

    } catch(err) {
        return response.status(400).json({ message: err.message });
    }
});

productRouter.put('/update/:id', async (request, response) => {
    try {
        const { name, qty } = request.body;
        const id = request.params.id;

        const updateProduct = new UpdateProductServer();

        const product = await updateProduct.execute({id, name, qty});

        return response.status(201).json(product);

    } catch(err) {
        return response.status(400).json({ message: err.message});
    }
});

productRouter.delete('/delete/:id', ensureAutheticated, async (request, response) => {
    try {
        const id  = request.params.id;
    
        const deleteProduct = new DeleteProductService();

        const product = await deleteProduct.execute({id});

        return response.status(200).json(product);
    } catch(err) {
        return response.status(400).json({message: err.message});
    }
});

productRouter.get('/search', ensureAutheticated, async (request, response) => {
    try {
        const search = new SearchProductServer();

        const page = Number(request.query.page);
        const name = request.query.name as string;

        if(!page) {
            page == 0
        }

        const product = await search.execute({
            page,
            name
        });
        return response.status(200).json({product});

    } catch(err) {
        return response.status(400).json({message: err.message});
    }
});

export default productRouter;