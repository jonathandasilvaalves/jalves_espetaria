// src/routes/index.ts
import { Router } from 'express';
import sessionsRouter from './sessions_routes';
import userRouter from './user_routes';
import orderRouter from './order_routes';
import productRouter from './product_routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/user', userRouter);
routes.use('/order', orderRouter);
routes.use('/product', productRouter);

export default routes;