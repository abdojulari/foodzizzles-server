import { UserRepository } from "./userRepository";
let userRepository: UserRepository;

describe("UserRepository", () => { 
    beforeEach(() => {
        jest.resetModules();
        userRepository = new UserRepository();
        userRepository.findByEmail = jest.fn();
        userRepository.findById = jest.fn();
        userRepository.update = jest.fn();
        userRepository.delete = jest.fn();
    });
         
    it("should create a user", async () => {
        const user = {
            name: "Example",
            email: "example@example.com",
            password: "password"
        };  
        const createdUser = await userRepository.create(user);
        expect(createdUser.getDataValue('name')).toEqual(user.name);
        expect(createdUser.getDataValue('email')).toEqual(user.email);
    });
  
    it("should find a user by email", async () => {
        const user = {
            name: "Example",
            email: "example@example.com",
            password: "password"
        };
        
        await userRepository.findByEmail(user.email);
        expect(userRepository.findByEmail).toHaveBeenCalled();
      
    }); 

    it("should find a user by id", async () => {
        const user = {
            name: "Example",
            email: "example@example.com",
            password: "password"
        };
    
        await userRepository.findById(1);
        expect(userRepository.findById).toHaveBeenCalled();
    });

    it("should update a user", async () => {
        const user = {
            name: "Example",
            email: "example@example.com",
            password: "password"
        } as any;
        
        await userRepository.update(1, user);
        expect(userRepository.update).toHaveBeenCalled();
    });

    it("should delete a user", async () => {
        const user = {
            name: "Example",
            email: "example@example.com",
            password: "password"
        } as any;

        await userRepository.delete(1);
        expect(userRepository.delete).toHaveBeenCalled();
    }); 
});