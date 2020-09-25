import { Post, Sub, User } from '../gql/entities'

export interface DBInterface {
	getUserByID(id: string): Promise<User | null>
	getUserByUsername(username: string): Promise<User | null>
	getPostsByUserID(id: string): Promise<Post[]>
	getSubBySubName(subName: string): Promise<Sub>

	addUserFromScratch(user: User): Promise<boolean>
	addUserByUsernameAndPassword(username: string, password: string): Promise<boolean>
}
