import CreateUserService from '../../src/services/CreateUserService';
import { createConnection, getConnection } from 'typeorm';

import AppError from '../../src/errors/AppError';

describe('UserService', () => {
  beforeEach(() => {
    return createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities: [
          "./src/models/*.ts"
        ],
        synchronize: true,
        logging: false
    });
    
  });
  afterEach(async () => {
    await getConnection().close();
  });

  const user = {
    name: "Jonathan",
    email: 'test@example.com',
    age: "27",
    password: 'password',
  }

  it('should authenticate a user', async () => {
    const userService = new CreateUserService();
    const result = await userService.execute(user);

    expect(result).toHaveProperty('user_id');
  });

  it('should validation email address already used', async ()=> {
    const userService = new CreateUserService();
  
    try {
        await userService.execute(user);
        await userService.execute(user);
    } catch (error: any) { 
        expect(error).toBeInstanceOf(AppError);
        expect(error.message).toBe('Email address already used');
    }
  });
})
