import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { generateUUID } from '../../util/generateUUID'
import { User, Community } from '..'

@Entity()
@ObjectType()
export class Post extends BaseEntity {
	@PrimaryColumn()
	@Field(() => ID)
	id: string

	@Column({ type: 'text' })
	@Field(() => User, { name: 'author' })
	authorID: User['id']

	@Column()
	@Field(() => String)
	title: string

	@Column()
	@Field(() => String)
	content: string

	@Column({ type: 'text' })
	@Field(() => Community, { name: 'community' })
	communityID: Community['id']

	@Column({ type: 'int' })
	@Field(() => Int)
	upvotes: number

	@Column({ type: 'int' })
	@Field(() => Int)
	downvotes: number

	static async persist(partial: Partial<Post>): Promise<Post> {
		return await Post.save(Post.create({ ...new Post(partial) }))
	}

	static async getByID(id: Post['id']): Promise<Post | null> {
		return (await Post.findOne({ where: `id='${id}'` })) ?? null
	}

	static async getAllByUserID(id: User['id']): Promise<Post[]> {
		return await Post.find({ where: `Post.authorID='${id}'` })
	}

	static async deleteByID(id: User['id']): Promise<boolean> {
		await Post.delete(id)
		return true
	}

	public constructor(partial?: Partial<Post>) {
		super()

		this.title = partial?.title ?? 'Default Title'
		this.content = partial?.content ?? 'No body.'
		this.id = partial?.id ?? generateUUID()
		this.upvotes = partial?.upvotes ?? Math.floor(Math.random() * Math.pow(10, 5))
		this.downvotes = partial?.downvotes ?? 0
		this.authorID = partial?.authorID ?? '1'
		this.communityID = partial?.communityID ?? '1'
	}
}
