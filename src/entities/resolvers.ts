import { UserResolver } from './User/UserResolver'
import { PostResolver } from './Post/PostResolver'
import { CommunityResolver } from './Community/CommunityResolver'

export const resolvers: [Function, ...Function[]] = [UserResolver, PostResolver, CommunityResolver]
