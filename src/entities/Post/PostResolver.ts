import { FieldResolver, Resolver, Root } from 'type-graphql'
import { Community, Post, User } from '..'

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => Community)
	async community(@Root() post: Post) {
		return post
	}

	@FieldResolver(() => User)
	async author(@Root() post: Post) {
		return await User.getByID(post.authorID)
	}
}
