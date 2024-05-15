import AuthenticateUserService from '../../src/services/AuthenticateUserService';
import CreateUserService from '../../src/services/CreateUserService';
import { createConnection, getConnection } from 'typeorm';

describe('AuthenticateUserService', () => {
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

  const user = {
    name: "Jonathan",
    email: 'test@example.com',
    age: "27",
    password: 'password',
  }

  it('should authenticate a user', async () => {
    const authenticateUserService = new AuthenticateUserService();
    const createUser = new CreateUserService();

    await createUser.execute(user);

    const result = await authenticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('token');
  });
})
