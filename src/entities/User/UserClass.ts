import { BaseEntity, Entity, Column, PrimaryColumn, OneToMany, DeepPartial } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'
import { generateUUID } from '../../util/generateUUID'
import { Post } from '..'

@Entity()
@ObjectType()
export class User extends BaseEntity {
	@PrimaryColumn()
	@Field(() => ID)
	id: string

	@Column()
	@Field(() => String)
	name: string

	@Column()
	@Field(() => String)
	email: string

	@Column()
	@Field(() => String)
	description: string

	@Column()
	password: string

	@OneToMany(() => Post, post => post.author)
	posts: Post[]

	static async getByID(id: User['id']): Promise<User | null> {
		return (await User.findOne({ id })) ?? null
	}

	static async getByName(name: User['name']): Promise<User | null> {
		return (await User.findOne({ name })) ?? null
	}

	static async persist(partial: DeepPartial<User>): Promise<User> {
		const initial: Partial<User> = {
			id: generateUUID(),
			description: '',
			email: ''
		}

		return User.create({ ...initial, ...partial }).save()
	}
}
