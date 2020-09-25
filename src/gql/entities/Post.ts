import { Field, ID, Int, ObjectType } from 'type-graphql'
import { Sub } from '.'

@ObjectType()
export class Post {
	@Field(() => ID)
	id: string

	@Field(() => String)
	author: string

	@Field(() => String)
	title: string

	@Field(() => Sub, { name: 'sub' })
	subName: string

	@Field(() => Int)
	upvotes: number

	@Field(() => Int)
	downvotes: number
}
