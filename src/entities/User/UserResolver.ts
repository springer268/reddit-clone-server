import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { User, Post } from '..'
import { Context } from '../../Context'
import bcrypt from 'bcrypt'
import { sign, decode } from 'jsonwebtoken'

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => [Post])
	async posts(@Root() user: User) {
		return await Post.getAllByUserID(user.id)
	}

	@Query(() => User, { nullable: true })
	async GetSelf(@Ctx() { req }: Context, @Arg('yeah') _yeah: string) {
		if (!req.headers.cookie) return null

		const data = decode(req.cookies['refresh-token']) as { userID: string }
		if (!data) return null

		const { userID } = data
		const user = await User.getByID(userID)

		if (!user) throw new Error('User doesnt exist')

		return user
	}

	@Query(() => User, { nullable: true })
	async GetUserByID(@Arg('id') id: string) {
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
		if (!(await bcrypt.compare(password, user.password))) throw new Error('Passwords do not match!')

		const refreshToken = sign({ userID: user.id }, 'erwugweyghiwhgqgq', { expiresIn: '7d' })
		const accessToken = sign({ userID: user.id }, 'erwugweyghiwhgqgq', { expiresIn: '7d' })

		res.cookie('refresh-token', refreshToken, { expires: new Date(Date.now() + Math.pow(10, 10)), httpOnly: false })
		res.cookie('access-token', accessToken, { expires: new Date(Date.now() + Math.pow(10, 10)), httpOnly: false })

		return user
	}

	@Mutation(() => User)
	async AddUser(@Arg('name') name: string, @Arg('password') password: string): Promise<User> {
		if (await User.getByName(name)) throw new Error('Username already taken!')

		const hashedPassword = await bcrypt.hash(password, 10)

		console.log(`New User: ${name}`)
		return await User.persist({ name, password: hashedPassword })
	}
}
