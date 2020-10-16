import { Entity, Column, PrimaryColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { generateUUID } from '../../util/generateUUID'
import { User, Community } from '..'

@Entity()
@ObjectType()
export class Post {
	protected static testData: Post[] = [
		new Post({ id: '1', title: 'LOL', authorID: '1' }),
		new Post({ id: '2', title: 'HEHE', authorID: '1' })
	]

	@PrimaryColumn()
	@Field(() => ID)
	id: string

	@Column()
	@Field(() => User, { name: 'author' })
	authorID: User['id']

	@Column()
	@Field(() => String)
	title: string

	@Column()
	@Field(() => Community, { name: 'community' })
	communityID: Community['id']

	@Column()
	@Field(() => Int)
	upvotes: number

	@Column()
	@Field(() => Int)
	downvotes: number

	static async getAllByUserID(id: User['id']): Promise<Post[]> {
		const result = this.testData.filter(post => post.authorID === id)
		return result
	}

	public constructor(partial?: Partial<Post>) {
		this.title = partial?.title ?? 'Default Title'
		this.id = partial?.id ?? generateUUID()
		this.upvotes = partial?.upvotes ?? 0
		this.downvotes = partial?.downvotes ?? 0
		this.authorID = partial?.authorID ?? '0'
	}
}
