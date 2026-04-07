export type UserBody = {
    name: string;
    email: string;
    password: string;
}

export type UserParams = {
    id: number
}

export type PostsParams = {
    id: number
}

export type PostBody = {
    title: string,
    body: string,
    imageUrl?: string;
}