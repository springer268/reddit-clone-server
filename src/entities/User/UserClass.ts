import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm'
import { Field, ObjectType, ID } from 'type-graphql'
import { generateUUID } from '../../util/generateUUID'

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

	static async persist(partial: Partial<User>): Promise<User> {
		return await User.save(User.create({ ...new User(partial) }))
	}

	static async getByName(name: User['name']): Promise<User | null> {
		return (await User.findOne({ where: `name='${name}'` })) ?? null
	}

	static async getByID(id: User['id']): Promise<User | null> {
		return (await User.findOne({ where: `name='${id}'` })) ?? null
	}

	public constructor(partial?: Partial<User>) {
		super()

		this.name = partial?.name ?? 'testName'
		this.id = partial?.id ?? generateUUID()
		this.description = partial?.description ?? `Hello, I am ${this.name}!`
		this.email = partial?.email ?? `${this.name.toLowerCase()}@gmail.com`
		this.password = partial?.password ?? `${this.name}123`
	}
}
