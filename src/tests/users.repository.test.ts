import UserRepository from '../user/repositories/userRepository';
import User from '../user/models/userModel';
import mockUsers from './__mocks__/users';

jest.mock('../user/models/userModel', () => ({
  findByPk: jest.fn(),
}));

const userRepository = new UserRepository();

describe('UserRepository - getFavoriteMoviesByUserById', () => {
  it('should return favorite movies for an existing user', async () => {
    const mockUser = mockUsers[1];

    const mockFindByPk = jest.fn().mockResolvedValue(mockUser);
    User.findByPk = mockFindByPk;

    const result = await userRepository.getFavoriteMoviesByUserById(1);

    expect(result).toEqual(mockUser.favorite_movies);
    expect(User.findByPk).toHaveBeenCalledWith(1, { attributes: ['favorite_movies'] });
  });

  it('should throw an error if user does not exist', async () => {
    const mockFindByPk = jest.fn().mockResolvedValue(null);
    User.findByPk = mockFindByPk;

    await expect(userRepository.getFavoriteMoviesByUserById(99))
      .rejects.toThrow('User with ID 99 not found');
  });
});
