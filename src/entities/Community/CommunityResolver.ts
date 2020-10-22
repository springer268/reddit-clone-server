import { Arg, Query, Resolver, Mutation } from 'type-graphql'
import { Community, Post } from '../../entities'

@Resolver(Community)
export class CommunityResolver {
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
	async GetPostsFromCommunityByID(@Arg('communityID') communityID: string) {
		const community = await Community.getByID(communityID)
		if (!community) return null
		const posts = await Post.find({ where: { communityID } })
		return posts
	}

	@Mutation(() => Community)
	async AddCommunityByName(@Arg('name') name: string): Promise<Community | null> {
		return await Community.persist({ name })
	}
}
