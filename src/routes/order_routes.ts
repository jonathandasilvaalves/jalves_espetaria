import { Router } from 'express';

import ensureAutheticated from '../middlewares/ensureAuthenticated';

const orderRouter = Router();

orderRouter.post('/create',async (request, response) => {
   try {

   } catch(err) {
       return response.status(400).json({message: err.message});
   }
});

export default orderRouter;