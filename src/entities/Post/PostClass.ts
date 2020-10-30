import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, DeepPartial } from 'typeorm'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import { generateUUID } from '../../util/generateUUID'
import { User, Community } from '..'

@Entity()
@ObjectType()
export class Post extends BaseEntity {
	@PrimaryColumn()
	@Field(() => ID)
	id: string

	@Column()
	@Field(() => String)
	title: string

	@Column()
	@Field(() => String)
	content: string

	@Column({ type: 'int' })
	@Field(() => Int)
	upvotes: number

	@Column({ type: 'int' })
	@Field(() => Int)
	downvotes: number

	@ManyToOne(() => User, user => user.posts)
	@JoinColumn({ name: 'authorID' })
	author: User

	@ManyToOne(() => Community, community => community.posts)
	@JoinColumn({ name: 'communityID' })
	community: Community

	@Column()
	authorID: string

	@Column()
	communityID: string

	static async getByID(id: Post['id']): Promise<Post | null> {
		return (await Post.findOne({ id })) ?? null
	}

	static async persist(partial: DeepPartial<Post>): Promise<Post> {
		const initial: Partial<Post> = {
			upvotes: Math.trunc(Math.random() * Math.pow(10, 5)),
			id: generateUUID(),
			downvotes: 0
		}

		return Post.create({ ...initial, ...partial }).save()
	}
}
