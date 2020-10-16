import { Field, ObjectType, ID, Query } from 'type-graphql'
import { generateUUID } from '../../util/generateUUID'
import { Post } from '..'

@ObjectType()
export class User {
	@Field(() => ID)
	id: string

	@Field(() => String)
	name: string

	@Field(() => String)
	email: string

	password: string

	@Field(() => String)
	description: string

	@Query(() => [Post], { name: 'posts' })
	async getPosts(): Promise<Post[]> {
		return await Post.getAllByUserID(this.id)
	}

	protected static createTestData(...entries: Partial<User>[]): User[] {
		return entries.map(entry => new User(entry))
	}

	protected static testData = User.createTestData(
		{ name: 'nick', id: '1' },
		{ name: 'michael' },
		{ name: 'wyatt' },
		{ name: 'zach' }
	)

	static fromUsernameAndPassword(username: User['name'], password: User['password']): User {
		return new User({ name: username, password })
	}

	static getByUsername(username: User['name']): Promise<User | null> {
		return new Promise<User | null>(resolve => resolve(this.testData.find(user => user.name === username) ?? null))
	}

	static getByID(id: User['id']): Promise<User | null> {
		return new Promise<User | null>(resolve => resolve(this.testData.find(user => user.id === id) ?? null))
	}

	static add(user: User): Promise<boolean> {
		user
		throw 'RIP'
	}

	static addByUsernameAndPassword(username: User['name'], password: User['password']): Promise<boolean> {
		username
		password
		throw 'RIP'
	}

	public constructor(partial?: Partial<User>) {
		const initial: Omit<User, 'getPosts'> = {
			name: 'noone',
			email: 'noone@gmail.com',
			description: 'Hello! I am noone.',
			id: generateUUID(),
			password: 'password123'
		}

		const props = { ...initial, ...partial } as User

		Object.entries(props).forEach(([k, v]) => {
			this[k as keyof this] = v
		})
	}
}
