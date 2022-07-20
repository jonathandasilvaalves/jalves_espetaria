import { getRepository } from 'typeorm';

import User from '../models/User';

interface Request {
    page: number;
    name: string;
    email: string;
}

class SearchUsersService {
    public async execute({page, name, email}: Request) {
        const userRepository = getRepository(User);

        if(name || email) {
            const users = await userRepository.find({
                skip: page-1,
                take: 10,
                where: [
                    { name },
                    { email }
                ]
            });
            return users;
        }

        const users = await userRepository.find({
            skip: page-1,
            take: 10
        });

        return users;
    }
}

export default SearchUsersService;