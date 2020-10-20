import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { User, Post } from '..'
import { Context } from '../../Context'
import { sign } from 'jsonwebtoken'

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
	async GetUserByName(@Ctx() { req }: Context, @Arg('name') name: string) {
		req
		return await User.getByName(name)
	}

	@Mutation(() => User)
	async AttemptLogin(@Ctx() { res }: Context, @Arg('name') name: string, @Arg('password') password: string) {
		const user = await User.getByName(name)

		if (!user) throw new Error('No such user exists')
		if (user.password !== password) throw new Error('Passwords do not match!')

		const refreshToken = sign({ userID: user.id }, 'erwugweyghiwhgqgq', { expiresIn: '7d' })
		const accessToken = sign({ userID: user.id }, 'erwugweyghiwhgqgq', { expiresIn: '7d' })

		res.cookie('refresh-token', refreshToken, { expires: new Date(Date.now() + 60 * 60 * 24 * 7), httpOnly: true })
		res.cookie('access-token', accessToken, { expires: new Date(Date.now() + 60 * 60 * 24 * 7), httpOnly: true })

		return user
	}

	@Mutation(() => User)
	async AddUser(@Arg('name') name: string, @Arg('password') password: string): Promise<User> {
		if (!(await User.getByName(name))) {
			console.log(`New User: ${name}`)
			const result = await User.persist({ name, password })
			return result
		} else {
			console.log('Someone tried to add a user that already exists!')
			throw new Error('Username already taken!')
		}
	}
}
