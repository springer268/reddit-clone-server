import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { User, Post } from '..'

@Resolver(User)
export class UserResolver {
	@Query(() => User, { nullable: true })
	getUserByID(@Arg('id') id: string) {
		return User.getByID(id)
	}

	@Query(() => User, { nullable: true })
	GetUserByUsername(@Arg('username') username: string) {
		return User.getByUsername(username)
	}

	@FieldResolver(() => [Post])
	posts(@Root() user: User) {
		return Post.getAllByUserID(user.id)
	}

	@Mutation(() => Boolean)
	addUserByUsernameAndPassword(@Arg('username') username: string, @Arg('password') password: string) {
		return User.addByUsernameAndPassword(username, password)
	}
}
