import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql'
import { User, Post, Comment, Community, CommunityUser } from '..'
import { Context } from '../../Context'
import bcrypt from 'bcrypt'
import { sign, decode } from 'jsonwebtoken'
import { In } from 'typeorm'

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => [Post])
	async posts(@Root() user: User, @Arg('amount') amount: number, @Arg('offset') offset: number) {
		return await Post.find({
			where: { authorID: user.id },
			take: amount,
			skip: offset,
			order: { upvotes: 'DESC' }
		})
	}

	@FieldResolver(() => [Comment])
	async comments(
		@Root() user: User,
		@Arg('amount') amount: number,
		@Arg('offset', { defaultValue: 0 }) offset: number
	) {
		return await Comment.find({
			where: { authorID: user.id },
			take: amount,
			skip: offset,
			order: { upvotes: 'DESC' }
		})
	}

	@FieldResolver(() => [Community])
	async communities(
		@Root() user: User,
		@Arg('amount') amount: number,
		@Arg('offset', { defaultValue: 0 }) offset: number
	): Promise<Community[]> {
		const communityIDs = (await CommunityUser.find({ userID: user.id })).map(cu => cu.communityID)
		return Community.find({
			where: { id: In(communityIDs.length > 0 ? communityIDs : ['']) },
			take: amount,
			skip: offset,
			order: { followerCount: 'DESC' }
		})
	}

	@Query(() => User, { nullable: true })
	async GetSelf(@Ctx() { req }: Context) {
		if (!req.headers.cookie) return null

		const data = decode(req.cookies['refresh-token']) as { userID: string }

		if (!data) return null

		const { userID } = data
		const user = await User.getByID(userID)

		if (!user) return null

		return user
	}

	@Query(() => User)
	async GetUserByID(@Arg('id') id: string) {
		const user = User.getByID(id)
		if (!user) throw new Error('User does not exist')
		return user
	}

	@Query(() => User)
	async GetUserByName(@Arg('name') name: string) {
		const user = User.getByName(name)
		if (!user) throw new Error('User does not exist')
		return user
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

		return User.persist({ name, password: hashedPassword })
	}
}
