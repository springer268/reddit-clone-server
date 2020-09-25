import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Sub {
	@Field(() => String)
	name: string

	@Field(() => Int)
	followerCount: number
}
