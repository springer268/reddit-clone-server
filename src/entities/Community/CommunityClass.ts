import { BaseEntity, Entity, PrimaryColumn, Column } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { generateUUID } from './../../util/generateUUID'

@Entity()
@ObjectType()
export class Community extends BaseEntity {
	@PrimaryColumn()
	@Field(() => ID)
	id: string

	@Column()
	@Field(() => String)
	name: string

	@Column()
	@Field(() => Int)
	followerCount: number

	static async persist(partial: Partial<Community>): Promise<Community> {
		const community = Community.create({ ...new Community(partial) })
		return await Community.save(community)
	}

	static async getByID(id: Community['id']): Promise<Community | null> {
		return (await Community.findOne({ where: { id } })) ?? null
	}

	static async getByName(name: Community['name']): Promise<Community | null> {
		return (await Community.findOne({ where: { name } })) ?? null
	}

	public constructor(partial?: Partial<Community>) {
		super()

		this.id = partial?.id ?? generateUUID()
		this.name = partial?.name ?? 'testCommunity'
		this.followerCount = partial?.followerCount ?? 0
	}
}
