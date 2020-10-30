import { BaseEntity, Entity, PrimaryColumn, Column, OneToMany, DeepPartial } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { generateUUID } from './../../util/generateUUID'
import { Post } from '..'

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

	@OneToMany(() => Post, post => post.community)
	posts: Post[]

	static async getByID(id: Community['id']): Promise<Community | null> {
		return (await Community.findOne({ id })) ?? null
	}

	static async getByName(name: Community['name']): Promise<Community | null> {
		return (await Community.findOne({ name })) ?? null
	}

	static async persist(partial: DeepPartial<Community>): Promise<Community> {
		const initial: Partial<Community> = {
			id: generateUUID(),
			followerCount: 0
		}

		return Community.create({ ...initial, ...partial }).save()
	}
}
