import { Field, Int, ObjectType } from 'type-graphql'
import { BaseEntity, Column, DeepPartial, Entity, PrimaryColumn } from 'typeorm'
import { generateUUID } from '../../util/generateUUID'

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
	@PrimaryColumn()
	@Field(() => String)
	id: string

	@Column()
	@Field(() => String)
	path: string

	@Column()
	@Field(() => String)
	content: string

	@Column()
	@Field(() => Int)
	upvotes: number

	@Column()
	@Field(() => Int)
	downvotes: number

	@Column()
	authorID: string

	@Column()
	postID: string

	@Column('text', { nullable: true })
	parentID: string | null

	static async getByID(id: Comment['id']): Promise<Comment | null> {
		return (await Comment.findOne({ id })) ?? null
	}

	static async persist(partial: DeepPartial<Comment>): Promise<Comment> {
		const initial: Partial<Comment> = {
			id: generateUUID(),
			upvotes: Math.trunc(Math.random() * Math.pow(10, 5)),
			downvotes: 0
		}

		return Comment.create({ ...initial, ...partial }).save()
	}
}
