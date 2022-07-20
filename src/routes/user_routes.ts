import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import UpdateUserService from '../services/UpdateUserService';
import SearchUserService from '../services/SearchUserService';
import SearchUsersService from '../services/SearchUsersService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();

userRouter.post('/create', async (request, response) => {
    try {
        const { name, email, age, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email, 
            age,
            password
        });

        delete user.password;

        return response.json(user);

    } catch(err) {
        return response.status(400).json({message: err.message });
    }
});

userRouter.put('/update/:id', ensureAuthenticated, async (request, response) => {
    try {
        const {name, email, age } = request.body;
        let userId = request.user.id;

        if(userId !== request.params.id) {
            return response.status(401).json({message: "You do not permission update this user"});
        }

        const updateUser = new UpdateUserService();
        const user = await updateUser.execute({
            id: userId,
            name,
            email,
            age
        });

        delete user.password;
        
        return response.status(200).json(user);

    } catch(err) {
        return response.status(400).json({ message: err.message});
    }
});

userRouter.get('/search/:id', ensureAuthenticated, async (request, response) => {
    try {
        let idUser = request.params.id;
        const search = new SearchUserService();

        const user = await search.execute(idUser); 

        delete user.password;

        return response.status(200).json(user);

    } catch(err) {
        return response.status(400).json({ message: err.message});
    }
});

userRouter.get('/users/search/', ensureAuthenticated, async (request, response) => {
    try {
        const search = new SearchUsersService();

        const page = Number(request.query.page);
        const name = request.query.name as string
        const email = request.query.email as string;

        if(!page) {
            page == 0;
        }

        const users = await search.execute({
            page,
            name,
            email
        });
        return response.status(200).json({users});

    } catch(err) {
        
    }
});

export default userRouter;