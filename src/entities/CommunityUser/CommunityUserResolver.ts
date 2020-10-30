import { Arg, Mutation, Resolver } from 'type-graphql'
import { CommunityUser } from '..'

@Resolver()
export class CommunityUserResolver {
	@Mutation(() => Boolean)
	async FollowCommunity(@Arg('userID') userID: string, @Arg('communityID') communityID: string) {
		const res = await CommunityUser.findOne({ userID, communityID })
		if (res) throw new Error('User already follows this Community.')

		await CommunityUser.persist({ userID, communityID })
		return true
	}

	@Mutation(() => Boolean)
	async UnfollowCommunity(@Arg('userID') userID: string, @Arg('communityID') communityID: string) {
		const res = await CommunityUser.findOne({ userID, communityID })
		if (!res) throw new Error("User doesn't follow this Community.")

		await CommunityUser.delete({ userID, communityID })
		return true
	}
}
