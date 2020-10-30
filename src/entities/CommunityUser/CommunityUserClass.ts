import { BaseEntity, Column, DeepPartial, Entity, PrimaryColumn } from 'typeorm'
import { Community, User } from '..'

@Entity()
export class CommunityUser extends BaseEntity {
	@PrimaryColumn()
	communityID: string

	@PrimaryColumn()
	userID: string

	static async persist(partial: DeepPartial<CommunityUser>) {
		const initial: Partial<CommunityUser> = {}

		return CommunityUser.create({ ...initial, ...partial }).save()
	}
}
