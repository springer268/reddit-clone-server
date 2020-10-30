import { UserResolver } from './User/UserResolver'
import { PostResolver } from './Post/PostResolver'
import { CommunityResolver } from './Community/CommunityResolver'
import { CommentResolver } from './Comment/CommentResolver'
import { CommunityUserResolver } from './CommunityUser/CommunityUserResolver'

export const resolvers: [Function, ...Function[]] = [
	UserResolver,
	PostResolver,
	CommunityResolver,
	CommentResolver,
	CommunityUserResolver
]
