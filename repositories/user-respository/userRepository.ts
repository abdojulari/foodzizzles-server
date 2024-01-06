import { User } from '../../models/user/user.model';

export class UserRepository {
    public async create(user: any): Promise<User> {
        return await User.create(user);
    }
    
    public async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email: email } });
    }
    
    public async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    public async update(id: number, user: User): Promise<[number, User[]]> {
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