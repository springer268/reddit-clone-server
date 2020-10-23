import { Arg, Query, Resolver, Mutation, Root, FieldResolver } from 'type-graphql'
import { Community, Post } from '../../entities'

@Resolver(Community)
export class CommunityResolver {
	@FieldResolver(() => [Post])
	async posts(@Root() community: Community, @Arg('amount') amount: number, @Arg('offset') offset: number) {
		return await Post.find({
			where: { communityID: community.id },
			order: { upvotes: 'DESC' },
			take: amount,
			skip: offset
		})
	}

	@Query(() => Community, { nullable: true })
	async GetCommunityByID(@Arg('id') id: string): Promise<Community | null> {
		return await Community.getByID(id)
	}

	@Query(() => Community, { nullable: true })
	async GetCommunityByName(@Arg('name') name: string): Promise<Community | null> {
		return await Community.getByName(name)
	}

	@Query(() => [Community])
	async GetCommunities(): Promise<Community[]> {
		return await Community.find()
	}

	@Query(() => [Post], { nullable: true })
	async GetPostsFromCommunityByID(
		@Arg('communityID') communityID: string,
		@Arg('amount') amount: number,
		@Arg('offset') offset: number
	) {
		const community = await Community.getByID(communityID)
		if (!community) return null

		const posts = await Post.find({
			where: { communityID },
			order: { upvotes: 'DESC' },
			skip: offset,
			take: amount
		})

		return posts
	}

	@Query(() => [Post], { nullable: true })
	async GetPostsFromCommunityByName(
		@Arg('name') name: string,
		@Arg('amount') amount: number,
		@Arg('offset') offset: number
	) {
		const community = await Community.getByName(name)
		if (!community) return null

		const posts = await Post.find({
			where: { communityID: community.id },
			order: { upvotes: 'DESC' },
			skip: offset,
			take: amount
		})

		return posts
	}

	@Mutation(() => Community)
	async AddCommunityByName(@Arg('name') name: string): Promise<Community | null> {
		return await Community.persist({ name })
	}
}
