import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { Post, User, Comment } from '..'

@Resolver(Comment)
export class CommentResolver {
	@FieldResolver(() => User)
	async author(@Root() comment: Comment) {
		return await User.getByID(comment.authorID)
	}

	@FieldResolver(() => Comment, { nullable: true })
	async parent(@Root() comment: Comment) {
		return comment.parentID ? await Comment.getByID(comment.parentID) : null
	}

	@FieldResolver(() => [Comment])
	async replies(@Root() comment: Comment) {
		return await Comment.find({
			where: { parentID: comment.id },
			order: { upvotes: 'DESC' }
		})
	}

	@FieldResolver(() => Post)
	async post(@Root() comment: Comment) {
		return Post.findOne({ id: comment.postID })
	}

	@Query(() => Comment)
	async GetCommentByID(@Arg('id') id: string) {
		return await Comment.getByID(id)
	}

	@Query(() => [Comment])
	async GetCommentsFromPostByID(
		@Arg('postID') postID: string,
		@Arg('amount') amount: number,
		@Arg('offset', { defaultValue: 0 }) offset: number
	) {
		return await Comment.find({
			where: { id: postID },
			order: { upvotes: 'DESC' },
			take: amount,
			skip: offset
		})
	}

	@Query(() => [Comment])
	async GetCommentsFromUserByID(
		@Arg('userID') postID: string,
		@Arg('amount') amount: number,
		@Arg('offset', { defaultValue: 0 }) offset: number
	) {
		return await Comment.find({
			where: { id: postID },
			order: { upvotes: 'DESC' },
			take: amount,
			skip: offset
		})
	}

	@Query(() => [Comment])
	async GetCommentsFromUserByName(
		@Arg('name') name: string,
		@Arg('amount') amount: number,
		@Arg('offset', { defaultValue: 0 }) offset: number
	) {
		const user = await User.findOne({ name })

		if (!user) throw new Error('User does not exist')

		return await Comment.find({
			where: { userID: user.id },
			order: { upvotes: 'DESC' },
			take: amount,
			skip: offset
		})
	}

	@Mutation(() => Comment)
	async AddCommentToPost(
		@Arg('content') content: string,
		@Arg('authorID') authorID: string,
		@Arg('postID') postID: string,
		@Arg('parentID', { nullable: true }) parentID: string
	) {
		const path = 2
		return await Comment.persist({ content, authorID, postID, parentID })
	}
}
