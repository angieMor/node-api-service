"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockUsers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        favorite_movies: []
    },
    {
        id: 2,
        name: 'Jhonny Doe',
        email: 'jhony@example.com',
        password: '123456',
        favorite_movies: [
            {
                Title: "Harry Potter and the Deathly Hallows: Part 2",
                Year: "2018",
                imdbID: "tt1201608",
                Poster: "https://m.media-amazon.com/images/M/MV5BOTA1Mzc2N2ItZWRiNS00MjQzLTlmZDQtMjU0NmY1YWRkMGQ4XkEyXkFqcGc@._V1_SX300.jpg",
                Genre: "suspense",
                Plot: "a"
            }
        ]
    }
];
/*const User = {
  findAll: jest.fn().mockResolvedValue(mockUsers),
  findByPk: jest.fn().mockImplementation((id) =>
    Promise.resolve(mockUsers.find((user) => user.id === id))
  ),
  create: jest.fn().mockImplementation((data) => {
    const newUser = { id: mockUsers.length + 1, ...data };
    mockUsers.push(newUser);
    return Promise.resolve(newUser);
  }),
  update: jest.fn().mockImplementation((data, options) => {
    const user = mockUsers.find((u) => u.id === options.where.id);
    if (user) {
      Object.assign(user, data);
      return Promise.resolve([1]);
    }
    return Promise.resolve([0]);
  }),
  destroy: jest.fn().mockImplementation((options) => {
    const index = mockUsers.findIndex((user) => user.id === options.where.id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return Promise.resolve(1); // Número de filas eliminadas
    }
    return Promise.resolve(0);
  }),
};*/
exports.default = mockUsers;
