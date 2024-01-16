import { User } from '../../../models/user/user.model';

export class UserService {
    private user = User;
    public async create(user: any): Promise<User> {
        // check if the user already exists
        const userExists = await this.findByEmail(user.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        // create the user
        const users =  await this.user.create(user);
        return users;
    }
    
    public async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email: email } });
    }
    
    public async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    public async findAll(): Promise<User[]> {
        return await User.findAll();
    }

    public async update(id: string, user: User): Promise<[number, User[]]> {
        const [affectedCount, updatedUsers] = await User.update(user, {
            where: { id: id },
            returning: true, // This tells Sequelize to return the updated records
        });
        
        return [affectedCount, updatedUsers];
    }

    public async delete(id: number): Promise<number> {
        return await User.destroy({
            where: { id: id },
        });
    }

}