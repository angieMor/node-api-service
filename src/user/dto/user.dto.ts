interface CreateUserDTO {
    name: string,
    password: string,
    email: string,
}

interface LoginUserDTO {
    email: string,
    password: string,
}

export type { CreateUserDTO, LoginUserDTO };