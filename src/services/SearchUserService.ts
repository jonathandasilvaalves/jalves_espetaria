import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import User from '../models/User';

class SearchUserService {
    public async execute(id:string) {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: {user_id: id}
        });
        
        if(!user) {
            throw new AppError('User do not exist!');
        }
    
        return user;
    }
}

export default SearchUserService;