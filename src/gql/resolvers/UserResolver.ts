import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { User, Post } from '../entities'
import { DB } from '../../db'

@Resolver(User)
export class UserResolver {
	@Query(() => User, { nullable: true })
	async getUserByID(@Arg('id') id: string): Promise<User | null> {
		return await DB.getUserByID(id)
	}

	@Query(() => User, { nullable: true })
	async getUserByUsername(@Arg('username') username: string): Promise<User | null> {
		return await DB.getUserByUsername(username)
	}

	@FieldResolver(() => [Post])
	async posts(@Root() user: User): Promise<Post[]> {
		return await DB.getPostsByUserID(user.id)
	}

	@Mutation(() => Boolean)
	async addUserByUsernameAndPassword(
		@Arg('username') username: string,
		@Arg('password') password: string
	): Promise<boolean> {
		return DB.addUserByUsernameAndPassword(username, password)
	}
}
