import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Community, Post, User } from '..'

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => Community)
	async community(@Root() post: Post) {
		return await Community.getByID(post.communityID)
	}

	@FieldResolver(() => User)
	async author(@Root() post: Post) {
		const result = await User.getByID(post.authorID)
		return result
	}

	@Query(() => Post, { nullable: true })
	async GetPostByID(@Arg('id') id: string) {
		return await Post.getByID(id)
	}

	@Mutation(() => Post)
	async AddPost(
		@Arg('title') title: string,
		@Arg('content') content: string,
		@Arg('authorID') authorID: string,
		@Arg('communityID') communityID: string
	) {
		return await Post.persist({ title, content, authorID, communityID })
	}

	@Mutation(() => Boolean)
	async DeletePostByID(@Arg('id') id: string) {
		return await Post.deleteByID(id)
	}
}
