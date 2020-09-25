import { FieldResolver, Resolver, Root } from 'type-graphql'
import { Sub, Post } from '../entities'
import { DB } from '../../db'

@Resolver(Post)
export class PostResolver {
	@FieldResolver(() => Sub)
	async sub(@Root() post: Post): Promise<Sub> {
		return await DB.getSubBySubName(post.subName)
	}

	@FieldResolver(() => String)
	async author(@Root() post: Post): Promise<string> {
		return (await DB.getUserByID(post.author))?.username as string
	}
}
