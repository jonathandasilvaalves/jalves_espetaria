import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;
    email: string,
    age: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, age, password}: Request) {
        const usersRepository = getRepository(User);

        const userExist = await usersRepository.findOne({
            where: {email},
        });

        if(userExist) {
            throw new AppError('Email address already used');
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            age,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }

}

export default CreateUserService;