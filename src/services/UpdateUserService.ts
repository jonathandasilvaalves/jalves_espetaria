import { getRepository } from 'typeorm';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    id: string;
    name: string;
    email: string;
    age: string;
}

class UpdateUserService {
    public async execute({id, name, email, age}: Request) {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {user_id: id}
        });

        if (!user) {
            throw new AppError('User do not exist!');
        }

        user.name = name;
        user.email = email;
        user.age = age;

        await usersRepository.save(user);

        return user;

    }
}

export default UpdateUserService;