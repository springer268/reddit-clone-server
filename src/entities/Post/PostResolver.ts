import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Community, Post, User, Comment } from '..'
import { Context } from '../../Context'

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => Community)
	async community(@Root() post: Post) {
		return await Community.getByID(post.communityID)
	}

	@FieldResolver(() => User)
	async author(@Root() post: Post) {
		return await User.getByID(post.authorID)
	}

	@FieldResolver(() => [Comment])
	async comments(
		@Root() post: Post,
		@Arg('amount') amount: number,
		@Arg('offset', { defaultValue: 0 }) offset: number
	) {
		return await Comment.find({
			where: { postID: post.id },
			order: { upvotes: 'DESC' },
			take: amount,
			skip: offset
		})
	}

	@Query(() => Post)
	async GetPostByID(@Arg('id') id: string) {
		const post = await Post.getByID(id)
		if (!post) throw new Error('Post does not exist')
		return post
	}

	@Mutation(() => Post)
	async AddPost(
		@Ctx() _ctx: Context,
		@Arg('title') title: string,
		@Arg('content') content: string,
		@Arg('authorID') authorID: string,
		@Arg('communityID') communityID: string
	) {
		return Post.persist({ title, content, author: { id: authorID }, community: { id: communityID } })
	}
}
