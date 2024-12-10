import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";

class UserServiceFactory {
    static create() {
        const userRepository = new UserRepository();
        return new UserService(userRepository);
    }
}

export default UserServiceFactory;