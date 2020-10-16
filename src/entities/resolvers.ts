import { UserResolver } from './User/UserResolver'
import { PostResolver } from './Post/PostResolver'

export const resolvers: [Function, ...Function[]] = [UserResolver, PostResolver]
