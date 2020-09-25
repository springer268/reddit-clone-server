import { Field, ObjectType, ID } from 'type-graphql'
import { Post } from '.'

@ObjectType()
export class User {
	@Field(() => ID)
	id: string

	@Field(() => String)
	username: string

	@Field(() => String)
	description: string

	@Field(() => [Post], { name: 'posts' })
	postIDs: string[]

	password: string
}
