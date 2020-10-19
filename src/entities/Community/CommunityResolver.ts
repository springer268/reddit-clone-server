import { Arg, Query, Resolver, Mutation } from 'type-graphql'
import { Community } from '../../entities'

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

	@Mutation(() => Community)
	async AddCommunityByName(@Arg('name') name: string): Promise<Community | null> {
		return await Community.persist({ name })
	}
}
