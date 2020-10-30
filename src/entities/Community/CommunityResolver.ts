import { Arg, Query, Resolver, Mutation, Root, FieldResolver } from 'type-graphql'
import { Community, Post } from '../../entities'

@Resolver(Community)
export class CommunityResolver {
	@FieldResolver(() => [Post])
	async posts(@Root() community: Community, @Arg('amount') amount: number, @Arg('offset') offset: number) {
		return await Post.find({
			where: { community: { id: community.id } },
			order: { upvotes: 'DESC' },
			take: amount,
			skip: offset
		})
	}

	@Query(() => Community, { nullable: true })
	async GetCommunityByID(@Arg('id') id: string): Promise<Community> {
		const community = await Community.getByID(id)
		if (!community) throw new Error('Community does not exist')
		return community
	}

	@Query(() => Community)
	async GetCommunityByName(@Arg('name') name: string): Promise<Community> {
		const community = await Community.getByName(name)
		if (!community) throw new Error('Community does not exist')
		return community
	}

	@Query(() => [Community])
	async GetCommunities(): Promise<Community[]> {
		return await Community.find()
	}

	@Mutation(() => Community)
	async AddCommunityByName(@Arg('name') name: string): Promise<Community> {
		if (await Community.getByName(name)) throw new Error('Community with this name already exists.')

		return await Community.persist({ name })
	}
}
