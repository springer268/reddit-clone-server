import { Community, CommunityUser } from 'entities'
import { In } from 'typeorm'

/*
const batchCommunities = async (communityIDs: Community['id'][]) => {
	const communityUsers = await CommunityUser.find({
		join: {
			alias: 'communityUser',
			innerJoinAndSelect: {
				community: 'communityUser.communityID'
			}
		},
		where: {
			communityID: In(communityIDs)
		}
	})

	const userIDToCommunities: { [key: number]: Community[] } = {}

	communityUsers.forEach(cu => {
		if (cu.userID in userIDToCommunities) {
			userIDToCommunities[cu.userID].push((cu as any).__community__)
		} else {
		}
	})
}
*/
