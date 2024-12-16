import UserRepository from '../user/repositories/userRepository';
import UserFavMovieAssoc from '../user/models/userFavMovieAssocModel';
import FavoriteMovie from '../user/models/favoriteMovieModel';
import User from '../user/models/userModel';

jest.mock('../user/models/userFavMovieAssocModel');
jest.mock('../user/models/favoriteMovieModel');
jest.mock('../user/models/userModel');

const mockUser = jest.mocked(User, { shallow: false });
const mockUserFavMovieAssoc = jest.mocked(UserFavMovieAssoc, { shallow: false });
const mockFavoriteMovie = jest.mocked(FavoriteMovie, { shallow: false });

describe('UserRepository', () => {
  const userRepository = new UserRepository();

  const mockMovies = [{ id: 1, Title: 'Inception', Year: '2010', imdbID: 'tt1375666' }];

  describe('getFavoriteMoviesByUserById', () => {
      it('should return favorite movies if they exist', async () => {
        // Mock datos devueltos por la base de datos
        const mockData = [
            {
                favoriteMovie: {
                    get: jest.fn().mockReturnValue({
                        id: 1,
                        Title: 'Inception',
                        Year: '2010',
                        imdbID: 'tt1375666',
                    }),
                },
                Notes: 'Amazing movie',
            },
        ];

        // Mock `UserFavMovieAssoc.findAll`
        mockUserFavMovieAssoc.findAll.mockResolvedValueOnce(mockData as any);

        const result = await userRepository.getFavoriteMoviesByUserById(1);

        expect(mockUserFavMovieAssoc.findAll).toHaveBeenCalledWith({
            where: { user_id: 1 },
            include: [{ model: FavoriteMovie, as: 'favoriteMovie' }],
        });

        expect(result).toEqual([
            {
                id: 1,
                Title: 'Inception',
                Year: '2010',
                imdbID: 'tt1375666',
                Notes: 'Amazing movie',
            },
        ]);
    });

    it('should throw an error if the database query fails', async () => {
        // temporary disable the console.error logs in the test results
        jest.spyOn(console, 'error').mockImplementation(() => {});

        mockUserFavMovieAssoc.findAll.mockRejectedValueOnce(new Error('Database error'));

        await expect(userRepository.getFavoriteMoviesByUserById(1)).rejects.toThrow('Database error');

        expect(mockUserFavMovieAssoc.findAll).toHaveBeenCalledWith({
            where: { user_id: 1 },
            include: [{ model: FavoriteMovie, as: 'favoriteMovie' }],
        });
    });
  });

  describe('addMovieToFavoritesByUserId', () => {
    it('should add a movie to the user\'s favorites if it does not exist', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockMovie = {
          Title: 'Inception',
          Poster: 'https://example.com/poster.jpg',
          Year: '2010',
          imdbID: 'tt1375666',
          Genre: 'Sci-Fi',
          Plot: 'A mind-bending thriller',
          Notes: 'Great movie',
      };

      const mockFavoriteMovieInstance = { id: 101, ...mockMovie } as any;
      const mockAssociation = { id: 1, Notes: 'Great movie' } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(null);

      // Mock FavoriteMovie.create
      mockFavoriteMovie.create.mockResolvedValueOnce(mockFavoriteMovieInstance);

      // Mock UserFavMovieAssoc.create
      mockUserFavMovieAssoc.create.mockResolvedValueOnce(mockAssociation);

      // Mock getFavoriteMoviesByUserById
      jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce([
          { ...mockMovie, Notes: 'Great movie' },
      ]);

      const result = await userRepository.addMovieToFavoritesByUserId(1, mockMovie);

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { Title: 'Inception' } });
      expect(mockFavoriteMovie.create).toHaveBeenCalledWith({
          Title: 'Inception',
          Poster: 'https://example.com/poster.jpg',
          Year: '2010',
          imdbID: 'tt1375666',
          Genre: 'Sci-Fi',
          Plot: 'A mind-bending thriller',
      });
      expect(mockUserFavMovieAssoc.create).toHaveBeenCalledWith({
          user_id: 1,
          fav_movies_id: 101,
          Notes: 'Great movie',
      });
      expect(result).toEqual([{ ...mockMovie, Notes: 'Great movie' }]);
    });

    it('should add an existing movie to the user\'s favorites', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockMovie = {
          Title: 'Inception',
          Poster: 'https://example.com/poster.jpg',
          Year: '2010',
          imdbID: 'tt1375666',
          Genre: 'Sci-Fi',
          Plot: 'A mind-bending thriller',
          Notes: 'Great movie',
      };

      const mockFavoriteMovieInstance = { id: 101, ...mockMovie } as any;
      const mockAssociation = { id: 1, Notes: 'Great movie' } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);

      // Mock UserFavMovieAssoc.create
      mockUserFavMovieAssoc.create.mockResolvedValueOnce(mockAssociation);

      jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce([
          { ...mockMovie, Notes: 'Great movie' },
      ]);

      const result = await userRepository.addMovieToFavoritesByUserId(1, mockMovie);

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { Title: 'Inception' } });
      expect(mockFavoriteMovie.create).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.create).toHaveBeenCalledWith({
          user_id: 1,
          fav_movies_id: 101,
          Notes: 'Great movie',
      });
      expect(result).toEqual([{ ...mockMovie, Notes: 'Great movie' }]);
    });

    it('should throw an error if the user does not exist', async () => {
      const mockMovie = { Title: 'Inception' };

      mockUser.findByPk.mockResolvedValueOnce(null);

      await expect(userRepository.addMovieToFavoritesByUserId(1, mockMovie as any)).rejects.toThrow(
          'User with ID 1 not found'
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).not.toHaveBeenCalled();
      expect(mockFavoriteMovie.create).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.create).not.toHaveBeenCalled();
    });

    it('should throw an error if there is a database error', async () => {
      const mockMovie = { Title: 'Inception' };

      mockUser.findByPk.mockRejectedValueOnce(new Error('Database error'));

      await expect(userRepository.addMovieToFavoritesByUserId(1, mockMovie as any)).rejects.toThrow(
          'Database error'
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('updateFavoriteMovieByIdAndByUserId', () => {
    it('should update a favorite movie and its notes if they exist', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' } as any;
      const mockMovie = {
          imdbID: 'tt1375666',
          Title: 'Inception Updated',
          Year: '2011',
          Poster: 'https://example.com/poster_updated.jpg',
          Genre: 'Sci-Fi',
          Plot: 'Updated plot',
          Notes: 'Updated notes',
      };

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);

      // Mock FavoriteMovie.update
      mockFavoriteMovie.update.mockResolvedValueOnce([1]); // Returns number of rows affected

      // Mock UserFavMovieAssoc.update
      mockUserFavMovieAssoc.update.mockResolvedValueOnce([1]); // Returns number of rows affected

      // Mock getFavoriteMoviesByUserById
      jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce([mockMovie]);

      const result = await userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie);

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockFavoriteMovie.update).toHaveBeenCalledWith(
          {
              Title: 'Inception Updated',
              Year: '2011',
              Poster: 'https://example.com/poster_updated.jpg',
              Genre: 'Sci-Fi',
              Plot: 'Updated plot',
          },
          { where: { imdbID: 'tt1375666' } }
      );
      expect(mockUserFavMovieAssoc.update).toHaveBeenCalledWith(
          { Notes: 'Updated notes' },
          { where: { fav_movies_id: 101 } }
      );
      expect(result).toEqual([mockMovie]);
    });

    it('should throw an error if the user does not exist', async () => {
      const mockMovie = { imdbID: 'tt1375666' } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(null);

      await expect(userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie)).rejects.toThrow(
          'User with ID 1 not found'
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).not.toHaveBeenCalled();
      expect(mockFavoriteMovie.update).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.update).not.toHaveBeenCalled();
    });

    it('should throw an error if the movie does not exist', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockMovie = { imdbID: 'tt1375666' } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(null);

      await expect(userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie)).rejects.toThrow(
          "Movie id couldn't be found"
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockFavoriteMovie.update).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.update).not.toHaveBeenCalled();
    });

    it('should update the movie details but not the notes if notes are not provided', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' } as any;
      const mockMovie = {
          imdbID: 'tt1375666',
          Title: 'Inception Updated',
          Year: '2011',
          Poster: 'https://example.com/poster_updated.jpg',
          Genre: 'Sci-Fi',
          Plot: 'Updated plot',
      };
      const updatedMovies = [
          {
              imdbID: 'tt1375666',
              Title: 'Inception Updated',
              Year: '2011',
              Poster: 'https://example.com/poster_updated.jpg',
              Genre: 'Sci-Fi',
              Plot: 'Updated plot',
              Notes: null, // No notes provided
          },
      ];

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);

      // Mock FavoriteMovie.update
      mockFavoriteMovie.update.mockResolvedValueOnce([1]); // Returns number of rows affected

      // Mock getFavoriteMoviesByUserById
      jest.spyOn(userRepository, 'getFavoriteMoviesByUserById').mockResolvedValueOnce(updatedMovies);

      const result = await userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie);

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockFavoriteMovie.update).toHaveBeenCalledWith(
          {
              Title: 'Inception Updated',
              Year: '2011',
              Poster: 'https://example.com/poster_updated.jpg',
              Genre: 'Sci-Fi',
              Plot: 'Updated plot',
          },
          { where: { imdbID: 'tt1375666' } }
      );
      // Notes shouldn't be updated in the UserFavMovieAssoc model because they we're not provided
      expect(mockUserFavMovieAssoc.update).not.toHaveBeenCalled();
      expect(result).toEqual(updatedMovies);
    });

    it('should throw an error if the database operation fails', async () => {
      const mockMovie = { imdbID: 'tt1375666' } as any;

      // Mock User.findByPk to throw an error
      mockUser.findByPk.mockRejectedValueOnce(new Error('Database error'));

      await expect(userRepository.updateFavoriteMovieByIdAndByUserId(1, mockMovie)).rejects.toThrow(
          'Database error'
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteFavoriteMovieByIdAndByUserId', () => {
    it('should delete a favorite movie association and the movie itself if no other users have it', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);

      // Mock UserFavMovieAssoc.count to simulate only one user has this movie
      mockUserFavMovieAssoc.count.mockResolvedValueOnce(1);

      // Mock UserFavMovieAssoc.destroy
      mockUserFavMovieAssoc.destroy.mockResolvedValueOnce(1); // 1 row deleted

      // Mock FavoriteMovie.destroy
      mockFavoriteMovie.destroy.mockResolvedValueOnce(1); // 1 row deleted

      const result = await userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666');

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockUserFavMovieAssoc.count).toHaveBeenCalledWith({ where: { fav_movies_id: 101 } });
      expect(mockUserFavMovieAssoc.destroy).toHaveBeenCalledWith({
          where: { user_id: 1, fav_movies_id: 101 }
      });
      expect(mockFavoriteMovie.destroy).toHaveBeenCalledWith({ where: { id: 101 } });
      expect(result).toBe('Movie with imdbID tt1375666 removed successfully');
    });

    it('should delete only the favorite movie association if other users have the movie', async () => {
      const mockUserInstance = { id: 1 } as any;
      const mockFavoriteMovieInstance = { id: 101, imdbID: 'tt1375666' } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(mockFavoriteMovieInstance);

      // Mock UserFavMovieAssoc.count to simulate multiple users have this movie
      mockUserFavMovieAssoc.count.mockResolvedValueOnce(2);

      // Mock UserFavMovieAssoc.destroy
      mockUserFavMovieAssoc.destroy.mockResolvedValueOnce(1); // 1 row deleted

      const result = await userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666');

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockUserFavMovieAssoc.count).toHaveBeenCalledWith({ where: { fav_movies_id: 101 } });
      expect(mockUserFavMovieAssoc.destroy).toHaveBeenCalledWith({
          where: { user_id: 1, fav_movies_id: 101 }
      });
      expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
      expect(result).toBe('Movie with imdbID tt1375666 removed successfully');
    });

    it('should throw an error if the user does not exist', async () => {
      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(null);

      await expect(userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666')).rejects.toThrow(
          'User with ID 1 not found'
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.count).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.destroy).not.toHaveBeenCalled();
      expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
    });

    it('should throw an error if the movie does not exist', async () => {
      const mockUserInstance = { id: 1 } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne
      mockFavoriteMovie.findOne.mockResolvedValueOnce(null);

      await expect(userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666')).rejects.toThrow(
          "Movie with imdbID tt1375666 doesn't exist"
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockUserFavMovieAssoc.count).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.destroy).not.toHaveBeenCalled();
      expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
    });

    it('should throw an error if the database operation fails', async () => {
      const mockUserInstance = { id: 1 } as any;

      // Mock User.findByPk
      mockUser.findByPk.mockResolvedValueOnce(mockUserInstance);

      // Mock FavoriteMovie.findOne to throw an error
      mockFavoriteMovie.findOne.mockRejectedValueOnce(new Error('Database error'));

      await expect(userRepository.deleteFavoriteMovieByIdAndByUserId(1, 'tt1375666')).rejects.toThrow(
          'Database error'
      );

      expect(mockUser.findByPk).toHaveBeenCalledWith(1);
      expect(mockFavoriteMovie.findOne).toHaveBeenCalledWith({ where: { imdbID: 'tt1375666' } });
      expect(mockUserFavMovieAssoc.count).not.toHaveBeenCalled();
      expect(mockUserFavMovieAssoc.destroy).not.toHaveBeenCalled();
      expect(mockFavoriteMovie.destroy).not.toHaveBeenCalled();
    });
  });
});
