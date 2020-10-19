import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { User, Post } from '..'

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => [Post])
	async posts(@Root() user: User) {
		return await Post.getAllByUserID(user.id)
	}

	@Query(() => User, { nullable: true })
	async getUserByID(@Arg('id') id: string) {
		return await User.getByID(id)
	}

	@Query(() => User, { nullable: true })
	async GetUserByName(@Arg('name') name: string) {
		return await User.getByName(name)
	}

	@Mutation(() => User)
	async AddUser(@Arg('name') name: string, @Arg('password') password: string): Promise<User> {
		return await User.persist({ name, password })
	}
}
