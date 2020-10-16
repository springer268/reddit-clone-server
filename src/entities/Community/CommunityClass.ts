import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Community {
	protected static testData: Community[] = [new Community({ name: 'meirl' })]

	@PrimaryKey()
	@Field(() => ID)
	id: string

	@Property()
	@Field(() => String)
	name: string

	@Property()
	@Field(() => Int)
	followerCount: number

	public constructor(partial: Partial<Community>) {
		this.id = '0'
		this.name = 'untitledcommunity'
		this.followerCount = 0

		partial &&
			Object.entries(partial as Community).forEach(([K, V]) => {
				this[K as keyof this] = V
			})
	}
}
